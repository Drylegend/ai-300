# AI-300 Lab 02 — Optimize Model Training in Azure Machine Learning

## 🎯 What are we doing in this lab?

In this lab, you transition from ad-hoc notebook experimentation to production-grade machine learning by modularizing your code into parameterized Python scripts and submitting scalable **Command Jobs** on Azure Machine Learning:

Interactive Notebook Exploration (Train classification model.ipynb)
     ↓
Convert Notebook to Python Script (train-classification-model.py)
     ↓
Refactor into Modular Functions (get_data, split_data, train_model, eval_model)
     ↓
Parameterize CLI Inputs with argparse (--training_data, --reg_rate)
     ↓
Local Terminal Validation on Compute Instance
     ↓
Scale Out: Submit Azure ML Command Job to Compute Cluster (aml-cluster)
     ↓
Review Code Snapshots, Output Logs (std_log.txt), and Metrics in Studio

The core concepts are:

Notebooks are ideal for experimentation, but automated pipelines require scripts.

Modular scripts built with functions make code reusable, maintainable, and unit-testable.

CLI parameters allow identical code to run with different data paths and hyperparameters without editing files.

Testing scripts in the terminal provides fast local feedback before incurring cluster compute costs.

Command jobs package your code snapshot, cloud environment, and compute cluster into a reproducible tracked run.

# 🟢 Step 1 — Open Azure Cloud Shell

## ✅ YOU HAVE TO DO THIS

Open the Azure Portal at **https://portal.azure.com/**.

Click the **[>_]** (**Cloud Shell**) icon in the top navigation bar.

Select **Bash** as the shell environment.

Confirm the appropriate Azure subscription is selected.

Choose **No storage account required** and click **Apply**.

# 🟢 Step 2 — Clone the Lab Repository

## ✅ YOU HAVE TO DO THIS

In Cloud Shell, clean any previous repository and clone the Microsoft learning repository:

rm -r mslearn-mlops -f

git clone https://github.com/MicrosoftLearning/mslearn-mlops.git mslearn-mlops

Navigate to the infrastructure directory:

cd mslearn-mlops/infra

# 🟢 Step 3 — Run the Setup Script

## ✅ YOU HAVE TO DO THIS

Run the setup script to provision the workspace, compute instance, cluster, and data asset:

./setup.sh

### ⚠️ Extensions Warning

Ignore any warnings stating that CLI extensions could not be installed.

Wait 5 to 10 minutes for resource provisioning to complete successfully.

# 🟢 Step 4 — Open Azure Machine Learning Studio

## ✅ YOU HAVE TO DO THIS

In the Azure Portal, open **Resource groups** > **rg-ai300-...**.

Select the workspace **mlw-ai300-...**.

Click **Launch studio** to open **ml.azure.com** in a new browser tab.

Dismiss any welcome or feature tour dialogs.

# 🟡 Step 5 — Verify Compute Resources

## 📖 VERIFY / UNDERSTAND

In Azure ML Studio, go to **Manage** > **Compute**:

Compute instances: ensure your compute instance is in **Running** state.

Compute clusters: ensure **aml-cluster** is listed with status **Succeeded** and 0 active nodes.

# 🟢 Step 6 — Launch Compute Terminal and Update SDK

## ✅ YOU HAVE TO DO THIS

On the **Compute instances** tab, click **Terminal** on your running instance:

Run the following commands in the terminal to ensure the v2 SDK is up to date:

pip uninstall azure-ai-ml -y
pip install azure-ai-ml

# 🟢 Step 7 — Clone Materials to Compute Storage

## ✅ YOU HAVE TO DO THIS

In the same compute terminal, clone the lab materials:

git clone https://github.com/MicrosoftLearning/mslearn-mlops.git mslearn-mlops

Switch to the Studio left navigation, click **Authoring** > **Notebooks** (or **Files**), and click the **Refresh (↻)** button.

Verify **Users/<your-user-name>/mslearn-mlops** is visible.

# 🟢 Step 8 — Open Initial Training Notebook

## ✅ YOU HAVE TO DO THIS

Navigate to:

mslearn-mlops/
    └── experimentation/
            └── Train classification model.ipynb

Open **Train classification model.ipynb**.

Verify kernel is set to **Python 3.10 - AzureML**.

Authenticate if prompted.

Run all cells to explore reading local data, splitting train/test, fitting Logistic Regression, and computing ROC AUC.

# 🟢 Step 9 — Convert Notebook to Python Script

## ✅ YOU HAVE TO DO THIS

To transition from notebook cells to script execution, use Studio's built-in export tool:

1. At the top of the notebook toolbar, select the **☰ (Menu)** icon.

2. Hover over **Export as**.

3. Select **Python (.py)**.

4. Enter file name: **train-classification-model**.

5. Click **Export**.

The newly created `train-classification-model.py` script opens automatically in the editor.

# 🟢 Step 10 — Save and Run Script in Terminal

## ✅ YOU HAVE TO DO THIS

At the top toolbar of the newly created script, click the **▷▷ (Save and run script in terminal)** icon.

The terminal executes:

python train-classification-model.py

Verify the output displays data splitting, model training, and ROC metrics.

### ❓ What if I get an ImportError for libstdc++6?

If you see: 'ImportError: /lib/x86_64-linux-gnu/libstdc++.so.6: version GLIBCXX_3.4.29 not found', run these three commands in the terminal:

sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
sudo apt-get update
sudo apt-get upgrade libstdc++6 -y

Then re-run the python script.

# 🟡 Step 11 — Inspect Modular Script with Functions

## 📖 VERIFY / UNDERSTAND

Now open the professional, production-ready script in the `src` folder:

mslearn-mlops/
    └── src/
         └── train-model-parameters.py

Observe how the code is organized into 4 distinct modular functions called by `main()`:

1. `get_data(path)`: reads data from local path or Azure ML data asset folder.

2. `split_data(df)`: splits features and labels into training and test splits.

3. `train_model(reg_rate, X_train, y_train)`: fits Logistic Regression with specified regularization.

4. `eval_model(model, X_test, y_test)`: evaluates Accuracy and AUC, logging ROC curve.

Modular functions make your ML code easily testable, reusable, and maintainable.

# 🟡 Step 12 — Review CLI Argument Parsing

## 📖 VERIFY / UNDERSTAND

Look at the `parse_args()` function at the bottom of `src/train-model-parameters.py`:

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--training_data', dest='training_data', type=str)
    parser.add_argument('--reg_rate', dest='reg_rate', type=float, default=0.01)
    args = parser.parse_args()
    return args

Two arguments are defined:

• `--training_data`: required path to the training dataset.

• `--reg_rate`: optional regularization rate hyperparameter (defaults to 0.01).

# 🟢 Step 13 — Test Script Without Arguments (Observe Expected Error)

## ✅ YOU HAVE TO DO THIS

Click the **▷▷ (Save and run in terminal)** button for `train-model-parameters.py` without specifying arguments.

Notice the script fails immediately after printing 'Reading data...':

Reading data...
FileNotFoundError: [Errno 2] No such file or directory: ''

This is expected! The script requires the `--training_data` parameter to know where the dataset is located.

# 🟢 Step 14 — Test Script in Terminal With Valid Parameters

## ✅ YOU HAVE TO DO THIS

In the compute instance terminal, navigate to the `src` directory and run the script with the relative path to the diabetes CSV:

cd ~/cloudfiles/code/Users/<your-user-name>/mslearn-mlops/src

python train-model-parameters.py --training_data ../data/diabetes-data/diabetes.csv

Or test with a custom regularization rate:

python train-model-parameters.py --training_data ../data/diabetes-data/diabetes.csv --reg_rate 0.1

The script now completes successfully, printing:

Reading data...
Splitting data...
Training model...
Evaluating model...
Accuracy: 0.77...
AUC: 0.84...

### 🎉 Local Script Testing Complete

You have confirmed that the modular script runs flawlessly from the command line.

# 🟡 Step 15 — Optional: Simulate and Catch Errors

## ⭐ OPTIONAL — TESTING YOUR DEBUGGING SKILLS

To see how terminal testing catches issues instantly before running on expensive clusters:

1. Temporarily comment out `import pandas as pd` in `src/train-model-parameters.py`.

2. Save the file and re-run the command in the terminal.

3. Observe the immediate `NameError: name 'pd' is not defined` traceback.

4. Restore `import pandas as pd` and save the file.

# 🟢 Step 16 — Open Command Job Notebook

## ✅ YOU HAVE TO DO THIS

Now you will submit this verified script to run as a remote **Command Job** on Azure ML compute cluster:

Navigate to: **mslearn-mlops/experimentation/Run script as command job.ipynb**.

Verify kernel: **Python 3.10 - AzureML**.

Run cells 1 through 4 to authenticate and obtain the `MLClient` handle.

# 🟢 Step 17 — Define the Azure ML Command Job

## ✅ YOU HAVE TO DO THIS

Examine Cell 6 where the `command` job is configured:

from azure.ai.ml import command, Input
from azure.ai.ml.constants import AssetTypes

# Configure the command job
job = command(
    code='./src',
    command='python train-model-parameters.py --training_data ${{inputs.training_data}}',
    inputs={
        'training_data': Input(
            type=AssetTypes.URI_FILE, 
            path='azureml:diabetes-data:1'
        )
    },
    environment='AzureML-sklearn-1.0-ubuntu20.04-py38-cpu@latest',
    compute='aml-cluster',
    display_name='diabetes-train-script',
    experiment_name='diabetes-train-script'
)

Notice key properties:

• `code='./src'`: packages the entire `src` folder and uploads it to Azure ML.

• `command`: runs the python script, injecting `${{inputs.training_data}}` dynamically.

• `environment`: pre-configured curated Scikit-Learn Docker container.

• `compute='aml-cluster'`: runs on remote cluster, not your local compute instance.

# 🟢 Step 18 — Submit Command Job to Compute Cluster

## ✅ YOU HAVE TO DO THIS

Run the submission cell:

returned_job = ml_client.create_or_update(job)
print(f'Submitted job: {returned_job.name}')
print(f'Studio URL: {returned_job.services["Studio"].endpoint}')

Click the generated Studio link to track execution.

# 🟡 Step 19 — Inspect Command Job in Azure ML Studio

## 📖 VERIFY / UNDERSTAND

In Azure ML Studio, open **Assets** > **Jobs** > **diabetes-train-script**:

1. **Overview Tab**: Shows status (Queued -> Running -> Completed), compute target (**aml-cluster**), and duration.

2. **Code Tab**: Contains an immutable snapshot of all files inside `./src` when the job was launched. This ensures 100% reproducibility.

3. **Outputs + logs Tab**: Open `user_logs/std_log.txt`. Here you can see the exact terminal output from the script running inside the cloud container.

4. **Metrics Tab**: View Accuracy, AUC, and ROC curve generated by the model evaluation.

# 🔴 Step 20 — Clean Up Azure Resources

## ⚠️ DO THIS WHEN YOU ARE FINISHED WITH THE LAB

To avoid unwanted charges:

Open Azure Portal (**https://portal.azure.com/**).

Go to **Resource groups** > select **rg-ai300-...**.

Click **Delete resource group**, enter the name, and select **Delete**.

# 🚨 What Do I Actually Have to Edit / Run?

## 1️⃣ In Train classification model.ipynb

Run cells to train logistic regression interactively.

Export notebook to Python script: `train-classification-model.py`.

## 2️⃣ In Compute Instance Terminal

Test `python train-classification-model.py`.

Navigate to `src/` and run `python train-model-parameters.py --training_data ../data/diabetes-data/diabetes.csv`.

## 3️⃣ In Run script as command job.ipynb

Configure command job with `code='./src'`, `compute='aml-cluster'`, and `inputs`.

Submit job using `ml_client.create_or_update(job)`.

## 4️⃣ In Azure ML Studio Jobs

Review Overview, Code snapshot, and `std_log.txt` output logs.

# ✅ FINAL LAB CHECKLIST

## PART 1 — Cloud Shell & Workspace Setup

☐ Open Azure Cloud Shell (Bash)

☐ Clone mslearn-mlops repository

☐ Navigate to mslearn-mlops/infra

☐ Execute ./setup.sh to provision workspace, compute, and data

☐ Launch Azure Machine Learning Studio

## PART 2 — Compute Preparation

☐ Verify Compute Instance is Running

☐ Verify aml-cluster is Succeeded

☐ Open Terminal on Compute Instance

☐ Update azure-ai-ml SDK via pip

☐ Clone mslearn-mlops into Compute Instance user storage

☐ Refresh Notebooks / Files pane in Studio

## PART 3 — Convert Notebook to Script

☐ Open Train classification model.ipynb

☐ Select Python 3.10 - AzureML kernel

☐ Run all cells to explore interactive model training

☐ Export notebook to Python (.py) named train-classification-model

☐ Save and run train-classification-model.py in terminal

☐ Verify script executes and outputs training metrics

## PART 4 — Modular Functions & CLI Parameter Testing

☐ Open src/train-model-parameters.py

☐ Review main() and modular functions: get_data, split_data, train_model, eval_model

☐ Review parse_args() defining --training_data and --reg_rate

☐ Test run without arguments to verify parameter validation error

☐ Run python train-model-parameters.py with --training_data parameter in terminal

☐ Verify Accuracy and AUC are successfully printed

## PART 5 — Submit and Track Remote Command Job

☐ Open Run script as command job.ipynb

☐ Verify Python 3.10 - AzureML kernel

☐ Configure command job (code: ./src, compute: aml-cluster, environment: curated Scikit-Learn)

☐ Pass ${{inputs.training_data}} mapped to azureml:diabetes-data:1

☐ Submit command job to Azure ML using ml_client.create_or_update()

☐ Navigate to Jobs > diabetes-train-script in Studio

☐ Inspect Code tab for immutable source code snapshot

☐ Inspect Outputs + logs tab for user_logs/std_log.txt

☐ Verify metrics and ROC curve artifacts

## PART 6 — Cleanup

☐ Delete Resource Group rg-ai300-... in Azure Portal when finished

# 🧠 Final Architecture

┌───────────────────────────────────┐
    │    Interactive Development        │
    │  (Compute Instance - Notebook)    │
    └─────────────────┬─────────────────┘
                      │ Export & Refactor
                      ▼
    ┌───────────────────────────────────┐
    │    src/train-model-parameters.py  │
    │  • get_data()    • split_data()   │
    │  • train_model() • eval_model()   │
    │  • argparse CLI parameters        │
    └─────────────────┬─────────────────┘
                      │ Local Terminal Verification
                      ▼
    ┌───────────────────────────────────┐
    │   Azure ML Command Job Definition │
    │  • code: ./src                    │
    │  • input: diabetes-data@latest    │
    │  • env: AzureML-sklearn-1.0       │
    └─────────────────┬─────────────────┘
                      │ Submit via MLClient
                      ▼
    ┌───────────────────────────────────┐
    │      aml-cluster Compute          │
    │  • Auto-scales cluster nodes      │
    │  • Runs containerized training    │
    │  • Streams logs to std_log.txt    │
    └───────────────────────────────────┘

# ⭐ One-Sentence Explanation

This lab teaches you how to transition machine learning code from exploratory notebooks into parameterized, modular Python scripts, validate them locally in the terminal, and submit them as tracked, reproducible Command Jobs on Azure ML compute clusters.
