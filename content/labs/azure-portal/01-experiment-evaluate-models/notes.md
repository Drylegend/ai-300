# AI-300 Lab 01 — Find the Best Classification Model with Azure Machine Learning

## 🎯 What are we doing in this lab?

In this lab, you use **Azure Machine Learning** to automatically train, evaluate, and track classification models using two complementary approaches:

Raw Diabetes Training Data
     ↓
Automated Machine Learning (AutoML) on Compute Cluster
     ↓
Data Guardrails & Model Leaderboard (VotingEnsemble, LightGBM, Random Forest)
     ↓
Identify Best Model & Inspect Performance (AUC, ROC, Confusion Matrix)
     ↓
Interactive Notebook Tracking with MLflow (Explicit Parameters, Metrics, Artifacts)

The main takeaways are:

Automated ML automates iterative model selection, feature engineering, and hyperparameter tuning.

Compute Instances provide your interactive cloud notebook environment.

Compute Clusters provide scalable GPU/CPU compute to train multiple child models in parallel.

MLflow provides unified tracking of parameters, metrics, and models across experiments.

Azure ML Studio visually compares runs, data guardrails, and ROC curves.

# 🟢 Step 1 — Open Azure Cloud Shell

## ✅ YOU HAVE TO DO THIS

Open Azure Portal at **https://portal.azure.com/**.

Select the **[>_]** (**Cloud Shell**) button at the top of the portal.

Select **Bash** if prompted.

Make sure the correct Azure subscription is selected.

Select **No storage account required** and click **Apply**.

# 🟢 Step 2 — Clone the Lab Repository

## ✅ YOU HAVE TO DO THIS

In Cloud Shell, remove any existing repo and clone the official Microsoft learning repository:

rm -r mslearn-mlops -f

git clone https://github.com/MicrosoftLearning/mslearn-mlops.git mslearn-mlops

Then navigate into the infrastructure folder:

cd mslearn-mlops/infra

# 🟢 Step 3 — Run the Setup Script

## ✅ YOU HAVE TO DO THIS

Run the setup script to provision your Azure Machine Learning workspace and compute resources:

./setup.sh

### ⚠️ Extensions Warning

Ignore any warning or error messages stating that Azure CLI extensions could not be installed.

The script will take approximately 5 to 10 minutes to provision the Resource Group, Workspace, Compute Instance, Compute Cluster, and Data Assets.

# 🟡 Step 4 — Manual Provisioning Fallback (If setup.sh Fails)

## 📖 USE ONLY IF AUTOMATED SETUP ENCOUNTERS AN ERROR

If the setup script hits regional quota or CLI errors, provision manually in Azure Portal:

1. Go to **+ Create a resource** > search for **Azure Machine Learning** > select **Create**.

2. Set Resource Group to **rg-ai300-labs**, Workspace name to **mlw-ai300-labs**, choose your closest region.

3. Select **Review + create** and wait for deployment to complete.

4. Go to the workspace > select **Launch studio**.

5. In Studio, navigate to **Manage** > **Compute** > **Compute instances** > **+ New**.

6. Set instance name, select VM size **Standard_DS11_v2**, and select **Create**.

7. Select **Compute clusters** tab > **+ New** > select **Standard_DS11_v2** > name it **aml-cluster** > **Create**.

# 🟢 Step 5 — Open Azure Machine Learning Studio

## ✅ YOU HAVE TO DO THIS

Once the workspace is created:

In Azure Portal, navigate to your resource group **rg-ai300-...**.

Select the Azure Machine Learning workspace named **mlw-ai300-...**.

In the Overview page, select **Launch studio** (this opens ml.azure.com in a new tab).

Close any welcome or guided tour pop-ups.

# 🟡 Step 6 — Verify Compute Resources

## 📖 VERIFY / UNDERSTAND

In Azure Machine Learning Studio, navigate to **Manage** > **Compute**:

Under **Compute instances**: verify your instance is listed with status **Running**.

Under **Compute clusters**: verify **aml-cluster** is listed with status **Succeeded** and current nodes **0** (it auto-scales on demand).

# 🟢 Step 7 — Open Compute Instance Terminal & Update Python SDK

## ✅ YOU HAVE TO DO THIS

You will run notebooks on your compute instance, but first ensure the modern **azure-ai-ml** v2 SDK is up to date:

On the **Compute instances** tab, find your running instance.

Under the **Applications** column, select **Terminal**.

In the compute terminal that opens, run:

pip uninstall azure-ai-ml -y
pip install azure-ai-ml

Ignore any messages saying packages could not be uninstalled.

# 🟢 Step 8 — Clone Lab Materials onto Compute Instance

## ✅ YOU HAVE TO DO THIS

In the same compute terminal, clone the learning repo into your user storage:

git clone https://github.com/MicrosoftLearning/mslearn-mlops.git mslearn-mlops

When finished, switch back to the studio left panel:

Navigate to **Authoring** > **Notebooks** (or **Files**).

Click the **Refresh (↻)** button at the top of the file tree.

Verify that **Users/<your-user-name>/mslearn-mlops** appears.

# 🟢 Step 9 — Open AutoML Classification Notebook

## ✅ YOU HAVE TO DO THIS

Navigate to the experimentation folder in your cloned repo:

Users/<your-username>/mslearn-mlops/
    └── experimentation/
            └── Classification with Automated Machine Learning.ipynb

Open **Classification with Automated Machine Learning.ipynb**.

At the top right of the notebook, check the kernel selector:

Ensure the kernel is set to **Python 3.10 - AzureML**.

If prompted to authenticate, click **Authenticate** and complete the sign-in prompt.

# 🟢 Step 10 — Connect to Workspace and Load Data

## ✅ YOU HAVE TO DO THIS

Run cells 1 through 6 in the notebook. Notice how the Azure ML v2 SDK authenticates and loads the data asset:

# Cell: Connect to Workspace
from azure.identity import DefaultAzureCredential, InteractiveBrowserCredential
from azure.ai.ml import MLClient

try:
    credential = DefaultAzureCredential()
    credential.get_token('https://management.azure.com/.default')
except Exception:
    credential = InteractiveBrowserCredential()

ml_client = MLClient.from_config(credential=credential)
print(f'Connected to workspace: {ml_client.workspace_name}')

The next cell loads the registered **diabetes-data** asset as an MLTable input:

from azure.ai.ml.constants import AssetTypes
from azure.ai.ml import Input

my_training_data_input = Input(
    type=AssetTypes.MLTABLE, path='azureml:diabetes-data:1'
)

# 🟢 Step 11 — Configure the AutoML Classification Job

## ✅ YOU HAVE TO DO THIS

Cell 8 configures the automated classification job:

from azure.ai.ml import automl

classification_job = automl.classification(
    compute='aml-cluster',
    experiment_name='auto-ml-class-dev',
    training_data=my_training_data_input,
    target_column_name='Diabetic',
    primary_metric='AUC_weighted',
    n_cross_validations=5,
    enable_model_explainability=True
)

# Set safety limits so the lab completes quickly
classification_job.set_limits(
    timeout_minutes=15,
    trial_timeout_minutes=5,
    max_trials=3,
    max_concurrent_trials=2
)

### ❓ What does AUC_weighted mean?

Area Under the ROC Curve (AUC) measures the model's ability to distinguish between diabetic and non-diabetic patients.

A weighted AUC accounts for class imbalances so the evaluation metric remains fair and robust.

# 🟢 Step 12 — Submit the AutoML Job to the Cluster

## ✅ YOU HAVE TO DO THIS

Run Cell 10 to submit the job to Azure Machine Learning:

returned_job = ml_client.jobs.create_or_update(classification_job)
print(f'Created job: {returned_job.name}')
print(f'Job web link: {returned_job.services["Studio"].endpoint}')

The cell output will provide a direct clickable URL to the job in Azure ML Studio.

# 🟡 Step 13 — Monitor AutoML Execution in Studio

## 📖 VERIFY / UNDERSTAND

In Azure Machine Learning Studio, navigate to **Assets** > **Jobs**:

Select the experiment **auto-ml-class-dev**.

Select the active job under the **Display name** column.

Notice that the parent job automatically spins up nodes on **aml-cluster**.

Watch child jobs initiate — each child job trains an algorithm (e.g., LightGBM, RandomForest, VotingEnsemble).

Wait for the overall job status to show **Completed**.

# 🟡 Step 14 — Explore Data Guardrails

## 📖 VERIFY / UNDERSTAND

Inside the completed AutoML job details in Studio, open the **Data guardrails** tab:

Class balance detection: verifies whether positive and negative cases are balanced.

Missing feature values imputation: verifies if any missing values were automatically detected and imputed.

High cardinality feature detection: checks for features with too many unique values.

All checks should show green checkmarks indicating the training data is sound.

# 🟡 Step 15 — Inspect Best Model & Leaderboard

## 📖 VERIFY / UNDERSTAND

Open the **Models + child jobs** tab:

Review the leaderboard of all trained models ranked by **AUC_weighted**.

Notice the top model is typically an ensemble (e.g. **VotingEnsemble** or **StackEnsemble**).

Click on the best model name to view its detailed metrics:

• Confusion Matrix (True Positives, False Positives)

• ROC Curve (True Positive Rate vs False Positive Rate)

• Precision-Recall curve

### 🎉 AutoML Exploration Complete

You have trained multiple models automatically and verified the best classification pipeline.

# 🟢 Step 16 — Open MLflow Tracking Notebook

## ✅ YOU HAVE TO DO THIS

Now you will learn how to take full programmatic control over tracking custom model training:

In Studio, return to **Authoring** > **Notebooks**.

Navigate to: **mslearn-mlops/experimentation/Track model training with MLflow.ipynb**.

Verify the kernel is **Python 3.10 - AzureML**.

# 🟢 Step 17 — Configure MLflow Tracking URI

## ✅ YOU HAVE TO DO THIS

Run cells 1 through 6 to connect to the workspace and point MLflow to Azure ML:

import mlflow

# Retrieve MLflow tracking URI for your Azure ML workspace
ws = ml_client.workspaces.get(ml_client.workspace_name)
mlflow.set_tracking_uri(ws.mlflow_tracking_uri)

print(f'MLflow tracking URI: {mlflow.get_tracking_uri()}')

This ensures all parameters, metrics, and models logged by MLflow are recorded directly inside Azure Machine Learning.

# 🟢 Step 18 — Prepare Data and Train with MLflow Autologging

## ✅ YOU HAVE TO DO THIS

Run cells 8 through 16:

The notebook reads `diabetes.csv` and splits it into training and testing sets.

It sets the experiment name: `mlflow.set_experiment('diabetes-classification')`.

It enables Scikit-Learn autologging: `mlflow.sklearn.autolog()`.

It fits a `LogisticRegression` model.

Notice MLflow automatically logs all hyperparameters (penalty, C, solver) and evaluation metrics without writing manual logging code!

# 🟢 Step 19 — Train Custom Models with Explicit MLflow Logging

## ✅ YOU HAVE TO DO THIS

Run cells 17 through 26. Notice how autologging is disabled to give you complete control over custom logging:

mlflow.sklearn.autolog(disable=True)

with mlflow.start_run():
    model = LogisticRegression(C=1/0.1, solver='liblinear').fit(X_train, y_train)
    
    # Log specific parameters
    mlflow.log_param('regularization_rate', 0.1)
    
    # Log custom evaluation metrics
    mlflow.log_metric('Accuracy', acc)
    mlflow.log_metric('AUC', auc)
    
    # Log model artifacts
    mlflow.sklearn.log_model(model, 'model')

The notebook trains both `LogisticRegression` and `DecisionTreeClassifier` with varying hyperparameters.

# 🟡 Step 20 — Compare MLflow Runs in Azure ML Studio

## 📖 VERIFY / UNDERSTAND

Go to **Assets** > **Jobs** in Azure ML Studio:

Select the experiment **diabetes-classification**.

Select the checkboxes next to 2 or 3 completed runs.

Click **Compare** at the top of the table.

Explore the **Metric comparison** chart (Accuracy vs AUC across different regularization rates).

Open any single run > **Outputs + logs** > view the serialized MLmodel files and conda environment dependencies.

# 🔴 Step 21 — Clean Up Azure Resources

## ⚠️ DO THIS WHEN YOU ARE FINISHED WITH THE LAB

To avoid ongoing compute charges:

Return to Azure Portal (**https://portal.azure.com/**).

Navigate to **Resource groups** > select **rg-ai300-...**.

Click **Delete resource group** at the top.

Type the resource group name to confirm and select **Delete**.

# 🚨 What Do I Actually Have to Edit / Run?

## 1️⃣ In Azure Cloud Shell (Bash)

Run `setup.sh` to provision Azure ML workspace, compute, and data.

## 2️⃣ In Compute Instance Terminal

Run `pip install azure-ai-ml` to ensure the modern v2 SDK is installed.

Run `git clone https://github.com/MicrosoftLearning/mslearn-mlops.git` into user files.

## 3️⃣ In Classification with Automated Machine Learning.ipynb

Authenticate with Azure.

Configure AutoML classification with `AUC_weighted` and limits (timeout_minutes=15, max_trials=3).

Submit job to `aml-cluster` and inspect models/guardrails in Studio.

## 4️⃣ In Track model training with MLflow.ipynb

Connect MLflow tracking URI to Azure ML workspace.

Test `mlflow.sklearn.autolog()` and custom `mlflow.log_metric()` / `mlflow.log_param()`.

Compare runs side-by-side in Studio Jobs.

# ✅ FINAL LAB CHECKLIST

## PART 1 — Cloud Shell & Infrastructure Provisioning

☐ Open Azure Cloud Shell and select Bash

☐ Clone mslearn-mlops repository

☐ Navigate to mslearn-mlops/infra

☐ Execute ./setup.sh

☐ Wait for Resource Group, ML Workspace, Compute Instance, and Cluster creation

☐ (Optional Fallback) Manually provision resources in Portal if script fails

## PART 2 — Studio Setup & Compute Instance Preparation

☐ Open Azure Portal and navigate to your ML Workspace

☐ Click Launch studio to open ml.azure.com

☐ Verify Compute Instance is Running

☐ Verify aml-cluster is Succeeded (0 nodes)

☐ Launch Terminal on Compute Instance

☐ Update azure-ai-ml SDK via pip

☐ Clone mslearn-mlops in Compute Instance terminal

☐ Refresh Files/Notebooks pane in Studio

## PART 3 — Automated Machine Learning (AutoML) Execution

☐ Open Classification with Automated Machine Learning.ipynb

☐ Select Python 3.10 - AzureML kernel

☐ Authenticate with Azure if prompted

☐ Connect to Workspace using DefaultAzureCredential and MLClient

☐ Load diabetes-data MLTable data asset

☐ Configure automl.classification job (target: Diabetic, metric: AUC_weighted)

☐ Configure safety limits (timeout_minutes=15, max_trials=3)

☐ Submit job to aml-cluster via ml_client.jobs.create_or_update()

## PART 4 — AutoML Results Exploration

☐ Navigate to Jobs > auto-ml-class-dev experiment in Studio

☐ Monitor child jobs as cluster scales up

☐ Wait for job status to reach Completed

☐ Inspect Data Guardrails tab (class balance, missing values)

☐ Inspect Models + child jobs tab leaderboard

☐ Review best model metrics (AUC, Confusion Matrix, ROC curves)

## PART 5 — Interactive MLflow Tracking

☐ Open Track model training with MLflow.ipynb in Studio

☐ Verify Python 3.10 - AzureML kernel

☐ Connect MLflow tracking URI to Azure ML workspace

☐ Set experiment name to diabetes-classification

☐ Test mlflow.sklearn.autolog() with LogisticRegression

☐ Test explicit logging (mlflow.log_param, mlflow.log_metric, mlflow.log_artifact)

☐ Train DecisionTreeClassifier with custom regularization rates

☐ Compare multiple model runs side-by-side in Studio Jobs

## PART 6 — Cleanup

☐ Delete Resource Group rg-ai300-... in Azure Portal when finished

# 🧠 Final Architecture

┌────────────────────────────────────────────────────────┐
               │           Azure Machine Learning Workspace             │
               │                   (mlw-ai300-...)                      │
               └───────────┬────────────────────────────────┬───────────┘
                           │                                │
                           ▼                                ▼
                 ┌───────────────────┐            ┌───────────────────┐
                 │ Compute Instance  │            │  Compute Cluster  │
                 │(Standard_DS11_v2) │            │   (aml-cluster)   │
                 │                   │            │                   │
                 │ • Jupyter Lab     │            │ • AutoML Parallel │
                 │ • MLflow Tracking │            │   Child Jobs      │
                 │ • Python SDK v2   │            │ • Auto-scaling    │
                 └─────────┬─────────┘            └─────────┬─────────┘
                           │                                │
                           └───────────────┬────────────────┘
                                           ▼
                              ┌─────────────────────────┐
                              │   Azure ML Studio Jobs  │
                              │                         │
                              │ • Guardrails & Metrics  │
                              │ • Model Leaderboard     │
                              │ • Run Comparisons       │
                              └─────────────────────────┘

# ⭐ One-Sentence Explanation

This lab teaches you how to rapidly discover the best classification model on Azure ML using hands-off Automated Machine Learning, and how to granularly track custom iterative model experiments using MLflow.
