**AI10  Module 16  Machine Learning Operations Engineer Associate – AI-300  Kiran Dambal  Day 1-20260905_141750-Meeting Recording**

5 September 2026, 08:47am

1h 10m 28s

**Kiran Dambal**   0:08
Okay, let's resume our discussion everyone. So we have explored the Azure Machine Learning workspace. We created the resource. We understood that what all the other three resources means 4 resources which will be created.
For what we will they will be created all this particular point we have understood.
Okay, online folks, am I audible?
I might be audible. Yeah.
Next.
Yes, everyone. So next, what we are going to do is we are going to start with respect to understanding about this automated ML. So in that, in terms of our machine learning workspace, we discussed about authoring tools, right? Authoring tools are a thing, but the other tools using which we'll be able to basically train the machine learning models. In that, we have three authoring tools. What are those?
Notebooks, Auto ML.
designer. Okay, these are the three things out of which we are going to experiment about the first one. So here in terms of this particular part, what we'll do is we'll automate the machine learning, okay, and then notebooks as well as perform the metrics to the responsible AI dashboard. Okay, so in simple what we'll be doing is we'll be using this particular auto image.
Before that, we have discussed right what is auto ML? Auto ML is a thing, but it is totally low code, low code automated platform or a tool inside this Azure Machine Learning workspace using which what I can do, I can or I'll be able to train the model without means with very bare minimum interaction. Okay, so here you can see that what you will be able to do is.
In terms of this, train multiple models in a parallel, OK, varying process pre-processing and algorithm selection. What I said whenever we talked about this particular model training process, I said that in terms of Auto ML, what we will be doing, I will be giving my data, I will be giving the flavour of that particular data, which particular category of the algorithm type it is, and then...
The target column, which I have to concentrate upon, as well as I'll be giving the one more thing is how many models I want. If I say 5, what it does, it is not going to give me the option to choose, OK, which five models I want. OK, it is going to decide, it learns about the data patterns and decide which are the top five algorithms which will be best fit for this kind of a data, and then...
it trains the model upon it. But we cannot control which to be selected. But what we can do is we have a control of which to be rejected. Means, okay, don't use this. Apart from this, you can select anyone. We can say that we can define a list. These 4 models, these four algorithms, you do not use. You cannot use.
Apart from these four algorithms, you can use anyone, whatever you want, they can use that particular algorithm. Like that, they can restrict from selecting. We cannot, yeah, like we cannot means give a preference over there, but we can restrict from selecting specific algorithm. Once we do that, what happens is parallel, you can see that logistic regression decision tree and linear SVM will be trained.
and all three models will be given for us. It will be my decision to decide which model I want to use. And also what it does, you know, it decreases in order, it gives me the list of the models which is performing best in terms of the accuracy, the evaluation metric. Understood? So this is what we are going to understand.
No.
So.
What all, in terms of this particular task, we discussed about flavors, right? What are the different different flavours we have in terms of this Auto ML? We have these five. OK, by default, we have these five, but if you want clustering, if you want the unsupervised learning, we have to import it customised model, understood? So, by default, we have classification, regression.
time series forecasting, computer vision as well as natural language processing. Here we can do both everywhere. We can tune it or we can trigger it through SDK method as well as through UI method. Means we can write a Python program, execute it in the notebook and initiate Auto ML job or else.
we can initiate through the UI itself. Understood? Getting my point? We'll try to explore both. First, we'll do it through the notebook. Then I'll give you the overview to the UI part also. Understood? Can we start? Okay, so I have shared you the link, right? Lab link.
Have you even got the lab link?
This one.
Everyone, please confirm that you have this link. Open the second one. Okay, ignore the first one here. That is about the case study which we have discussed in the first chapter. Open the second one which says find the best classification model with Azure Machine Learning. I'll go very slow as this is first lab you're performing like on the on the like live Azure interface itself. We'll be switching the tabs.
Or else you can connect to those monitors if you want.
It's demo you can plug out and you can connect.
Okay, yes. Okay, there are no enough monitors.
Okay, so first what we'll do is let's understand step by step. Okay, I'll explain or walk you through the instructions first.
Yes, so first step is provisioning the Azure Machine Learning resource or a workspace that we have already done. Yes, provisioning in the sense we are supposed to create the workspace that is already completed where we have created the workspace. And then here what they are doing, they are asking us to create the workspace through Azure portal everywhere.
means to execute a specific command and then create a workspace inside that. So basically, let me explain what is there inside this particular command. Okay, what all things we are going to create means we will do that. Why we will do that, why we have to do that, I'll explain. Okay, let me copy this GitHub URL and show you what it contains of.
Okay, sorry.
Inside this, they're asking us to...
Move towards the CDMS learn up instra.
Mishops infra.
Set up dot SH.
Okay, what is this? Okay, observe the programme everyone. What type of code programme it is?
It's a shell scripting, everyone. OK, basically, what about ARM templates? Azure Resource Manager means, basically, Azure comes with respect to its own built-in cloud compute. OK, sorry, not cloud compute, it comes with respect to built-in cloud command prompt. OK, known as Cloud Shell. OK, it is a shell scripting where...
What I'm doing, I'm writing a command to create my resources without me going over there through UI doing all these things. We are going to write a command to create all the resources. Okay, so here, first of all, what we are going to do, I'll walk you through the instructions. This is very, very important. Even these commands are important to everyone. First of all, I'll be very slow.
What I'm defining over here, these are my names. OK, what should be my resource group name? OK, and then what should be my who is resource provider? That is Microsoft Managed Services that you can ignore. Region. OK, they're specifically using the East US, East West US, to Central US, North Europe, all of these things, these regions. OK, we have already created our means we have some restriction over there that.
You have to create it in a specific region. We'll not run this command, but this is very important. Okay, next, after that, random region it is going to select out of them and then workspace name. Okay, the name is AI 300, that is a common name, and then the compute instance and compute cluster.
Okay, we discussed that, no? So we discussed about compute instance. It's about the compute cluster is nothing but combination of a multiple clusters over that. So here, what we'll be creating, we'll be creating a resource group, we'll be creating the workspace, we'll be creating the compute instance, and we'll be creating the compute cluster. Getting it?
Infra setup, not nothing else. OK, so first, OK, to create a resource group, OK, what is the command used is easy group create name.
This is the command, everyone.
Did you get more of them?
Ah, these are like shell scripting, see like command line interface itself.
Just exactly like that. Okay, same thing we are going to execute. Remember our write down it, write this particular command down. It's very important in your exam point of view to create a resource group. We are going to use a command AZ group create and provide 2 details as a parameters. Okay, one is name and the other one is location. In which particular region you want to create the
Resource group understood.
Next, to create the workspace. OK, as it resource group is just a it is not a ML kind ML infrastructure, it is just a normal infrastructure in my Azure platform. We did not use any tag ML over there to use with respect to use the for machine learning workspace, we use AZ ML workspace create.
OK, you can see over here I'm using this particular command which says az ML workspace create.
Getting it. So here what am I doing? We are using this particular command AZ ML workspace create and for passing 1 parameter which is my workspace name and creating my workspace. Understood.
Then, after that, to create a compute. OK, so here I am supposed to create 2 computes everyone. One is compute instance and the other one is compute cluster. OK, here, this to create a compute, the command name is same. You can observe az ML create compute for instance also az ML create compute for.
Cluster also, but here I can see that after name here I am defining something called as type.
In terms of a type, I am specifically mentioning that it is a compute instance, but for compute cluster, it is not compute cluster, it is AML compute.
Name of, so naming convention, habit of Azure. Okay, so in terms of a compute cluster, the command name is AML compute, Azure ML compute. Understood? Okay, and here you can observe to create a compute instance. What I'm doing, I'm giving only three parameters. What type of a compute it is?
What is the name of a compute? Size of a compute. Okay, size in the sense, the different variables we have, no, out of which, which one we want to create. So here we can observe we are using standard DS 11 V2. It is not compulsory that we have to use standard DS 11 V2. There are almost around 25 to 30 different variants of a compute size available. We can choose whatever we want.
Understood? Okay, but this is a normal compute which will be used for machine learning and deep learning workloads, which comes with respect to 14 GB RAM and then 28 GB storage. Getting it? Yes. Now, here.
What is the extra parameter you can observe over here in terms of this compute cluster?
Why we have to give instance name?
Cluster is the combination of a multiple instance. Here I'm saying maximum how much instance you want to create. Okay, you can see that I'm creating it as a minimum to if we have to create. Okay, that's what means the number should be not one. If I give it as one, there is no difference between compute instance and compute cluster. Okay, minimum I have to give it as two.
maximum you can give anything. Okay, so we'll keep it to itself due to cost constraint. Understood? Yes. Next, what we are doing, next we have something called as data. So here, to create a compute, we use the command AZML compute create. To create a data file, what we'll do, we'll use the command.
Easy ML data create. OK, what are we creating? Are we creating a data store or data set here?
It's a data asset itself. Okay, so it's not a data source. It's a data asset means I'm not going inside a workspace web store and then creating. I'm just creating normally means it will be created as a one individual asset to other. Okay, what I'm doing, I'm just executing this particular command and then initiating it. So now what we will do is
Our workspace is already created everywhere. Yes or no? So workspace is already created. Now what we have to do, we have to create this particular, all the other things. Okay, either means we have that constraint. Okay, what is the constraint? The constraint is I cannot, means, sorry, the constraint is.
I cannot create the region with respect to those mentioned regions. Yes, so workspace is already created. Now we have to create a compute instance, compute cluster, then we have to create a data. OK, that particular data, whatever we have, that data we have to initiate. OK, so there are two data sets. One is diabetes data, OK?
And then only the from diabetes data, I am creating the diabetes, importing that particular variable, diabetes.csv. So this we have to do. This we are going to do manually. Getting it, understanding everyone. Okay.
No.
Here, here, here we have answer inside data in the same this diabetes data, we have this diabetes.csv.
OK, so we are importing that specific file from that cloned repository.
Because we will be using inside the Azure itself, no means let me show you here, this is my Azure able to see this, this is my terminal.
The terminal is inside the Azure itself. No need to use the AZ login. In the previous lab, 103 terminal was on my Visual Studio Code. So Visual Studio Code terminal was supposed to be connected to the Azure infra. So that's why we used to do AZ login. Now no need to do AZ login. Understood?
We can do the all these things means locally also means through UI also we can create the same things getting it.
Exactly, all the steps mentioned by default, no, we did not create all the, we created only workspace, apart from workspace.
So we have not created compute instance, we have not created comp. So till here we have done.
Okay, so we have to create a compute instance. We have to create a compute cluster. We have to create a training data set.
It will be there.
I'll explain. So basically, okay, one more thing. So I think I was supposed to explain this further, but okay, as the question come here, when we talk about creating a data set, there are three types of data sets. Okay, one is ML table. First type is ML table. Second type is URI file. Okay, and third type is.
URI folder. OK, when I talk about ML table, it is nothing but it is kind of a it is not CS, OK, but it is the one which is going to link to the CS. Let me show that here.
Okay, this is my data set. Diabetes.csv is my data set. If I open this ML table, what it is doing, it is considering the containing that particular metadata of that particular part. Okay, what do you mean by pointers? Heard about pointers? What are pointers?
The one which is going to return to the location of that particular original data. So ML table is just like that. It has a detailed metadata, which is going to link me to that particular original data set. You can see over here inside that path file slash data diabetes dot CSE. Apart from path, what it is, it has a transformation.
OK, read delimited is means it says it is a CS. OK, it is not a tabular data, it is a CS data, comma separated values. It's kind of a metadata ML table, understood? First type is a ML table. OK, if you directly feed it as a CS file, it will be URI file, means you are going to upload it as a one unified resource identifier, one specific URL, that is.
URI file, OK? Or else, if you have multiple files like CSV1, CSV2, CSV3, CSV4, like that, OK, then you have to upload it as a folder that comes as a URI folder. OK, instead of here, I'm uploading diabetes.csv everywhere. If I was supposed to upload diabetes data itself, then I would have uploaded it as a...
URI folder. If I was supposed to upload this diabetes.data, my command over there, my data, it means my parameter over there would have been URI folder because it has two files in it, ML table file and diabetes.csv file. Understood?
So, that's why here you can see that.
Inside this particular type of a data create, okay, I have three types. One is the URI file, second one is URI folder, third one is ML table. If you are uploading the folder which has both ML table and data diabetes dot CS, then you are going to use the.
URI folder. If you're only uploading, directly uploading CS file itself, then you're going to use URI file. If you're not directly uploading CS, you're uploading it to the ML table by defining the path, then it is ML table. Understood? Got the point everyone? Okay, so now we have to make it available. How to do?
Will execute it directly.
OK, we'll do one thing everyone first.
Come back, means don't go to the machine learning workspace. Come to the Azure default directory.
Azure, Azure, okay, portal.azure.com.
Okay, here in the instruction, you can see that what they are saying is browse to the Azure portal.azure.com and then click upon that particular cloud shell. Okay, I'll start from everyone in the homepage of Azure portal.
Come to the homepage of Azure Portal, everyone. We have created our resource now. We have to just make the data available in that particular resource. For that, click upon this Cloud Shell.
Able to see it OK now.
Okay, so once, I think if you're opening it for the first time, you're going to get the option PowerShell or a bash. Select bash. Okay, then it is going to give you a small template saying that, do you need a storage account and all? You just have to click upon no need to mount any storage account.
No storage account, no storage account required, no need to select that particular.
Subscription you have to select. OK, your.
Okay, no.
Awesome.
Subscription you have to select, but there will be something called as this virtual network. No need to select that. OK, just click upon directly apply.
Yes.
Then you get it like this.
Yes.
First, bash. After that, it will give you a small dialogue box. Inside that, no need to create any storage account and no need to click create any virtual network. The only selection of a subscription and then clicking open apply. Then it will lead to this particular platform interface.
Got it.
Anyone?
Is facing any issues in this?
Yeah.
No need to select any storage account.
Just select subscription brand and then click upon apply.
Okay, I'll keep on giving the commands in the Team chat. Okay.
Command number one is this, easy ML configure defaults. Here what you have to do is you have to add your workspace name.
I've created my workspace under this ML WS123. Yes, are you unable to see that? So basically what you have to do is first, for example, I cannot directly execute this command, easy ML create name compute instance. I have to provide the.
First we'll clone the repository. After that I'm seeing. Okay, bit confusing everyone. This is just because we are using this particular student account. Lizania.
Everyone. Okay, so first what we have to do is we have to define our workspace name first to it. Okay, after that, what we'll be able to do, we'll be able to execute these commands one by one because in these commands you can see there is no specific workspace name mentioned. Getting it? Okay, for that reason, what I'll do is I'll just...
Click upon, OK, pair have. First, we will clone the repository everyone. First, here you have this git clone command.
Can I execute that, copy that, and execute that everyone?
Done.
Anyone lagging behind?
It is a bit difficult, but still anyone lagging behind.
Okay, so now second command is that particular CD MS learn hyphen ML ops slash infra. You will see do not pick the setup dot SH. If you just pick that setup dot SH, it will run the whole command. Okay, don't pick the setup dot SH. I'm just pick the only one line. CD MS learn ML ops.
Infra able to see it, just do that.
Okay, now I am inside the infra. Okay, instead of executing the setup.sh, what we'll do is we'll execute those commands one by one. First of all, what I have to do here, what it is doing over here after creating the workspace name, it is triggering that workspace as a insider defaults, means all the commands which I'm going to execute next.
they'll be inside the workspace itself. If they need a workspace name, they will load it from that particular place. For that reason, what we have to do, we have to give our workspace name first. OK, for that, I'll give you the command.
Trust.
It's kind of an environment variable, yes.
I'll give you the command first in the chat. So here, after equals, you have to add your workspace name.
After equals to, you have to add your workspace name. I've given the command in the chat, which have pasted immediately to the WhatsApp group.
So here you can see that I'm adding this easy configure default workspace equals to.
I'm giving them my workspace name.
Which is supposed to be...
Okay, I'll just copy it from here.
This is my workspace name ML WS 123 I've given. I'm going to use the same thing over here.
Done, configured.
Yes.
It will not give you any confirmation, but it will be configured as a default environmental credential in the backend under the name workspace. Getting it.
Have you done here till here?
Now, what I'll do is you can observe that I'll just pick this particular compute command.
Okay, everyone, one more thing. Compute instance has to be unique. Okay, the name which is given to the computer instance has to be unique. So what you do, you have to add the name from your name. Start with your name, add some random numerical value after your name. So I'm going to copy that command.
and paste it over here. Please make sure that here you have to add your name with space, with space everyone. Space is very important in this command. Okay, I'll just add this.
Your name?
Replace that arrows your name with respect to the your name everyone. So now I'll copy this and add it over here.
Use your notepad to edit it.
Ah, I've given the command in the chat.
I'm using this particular name, Kiran 1312232, means randomly I'm giving the digit so that this becomes unique name. Okay, so AZ ML compute create name, use your name. I'm specifically mentioning, don't forget, use your name like this, everyone. Okay, and then.
space hyphen hyphen size standard DS11 V2 hyphen type compute instance. This will take at least 4 to 5 minutes to create our compute.
OK, chase.
Okay, resource group it, okay, we resource group also we have to define it as a default.
That I forgot, forgot. How did I forget that?
OK, everyone, before executing this.
I have to execute this resource group command also. Tomorrow, like I'll bring with a detailed, I was not expecting not having LDS today. I'll bring a detailed command, so I'll prepare a lab gate separately and I'll come with those commands.
Resource group also we have to add it as a default for that command. I'm going to give it in the Team chat.
If to add a resource group name after the equals to other.
Okay, so what is my resource group name?
Here, somewhere it will be RG220 user 20 in your home page overview page of your workspace itself. Here, you can see that local resource group. You can find that resource group. Just click upon copy there and then run the command. First, you have to run this easy space.
OK, this control V is not going to work.
If Control V is not working, you can use Shift V.
So shift inserts are not shift tree.
Thank you.
OK, once you define your resource group, once you define your easy ML workspace name, then you can execute this command.
Now, it will execute.
Okay, so sorry for this confusion. I was not really expecting this environment.
Yeah.
Okay, I'll give you a series of a command to execute.
Total weather.
Play me.
No, no dollar sign in terms of this. Dollar sign will be used for importing the predefined variables. We are not using the shell scripting. We are not using this here.
No.
Okay, just two minutes everyone. I'm just defining all the commands which has to be executed.
Just.
Okay, I have created this particular whole list of commands. If you have whatever commands you have missed, you can explore. And there, only in the first three commands, you have to edit everyone. First command is you have to add your workspace name. Second command, you have to add your resource group name. Third command, you have to add a unique name for a compute. Remaining everything will be same as it is.
Understood. OK, I'm adding this command list in the WhatsApp, not what teams chat.
Make sure that those things are executed in a one-one line, complete line itself. Command one, command two, command three, command 4, command 5, command 6. Command 3, it will take minimum 4 to 5 minutes to execute. How many of you getting this in progress symbol over there?
How many of you are not getting it?
Anyone who is not getting in progress?
It's fine. I can help you, please.
OK, thank God.
After this, run the command number 4, command number 5, and command number 6. Those will take hardly 55 seconds each.
Online folks.
OK, and...
We are doing that now.
ML table name diabetes training is a path you can see over here.
In terms of my...
Repository.
Here you can see that diabetes data.
Name is, it is going to create a diabetes data. In the path, you can see that I'm giving data slash data slash diabetes data folder name.
Huh, yes.
Okay, once you create your instance, compute instance is created, you can see that it will give you all these details. Okay, so location, all of that particular random things it is going to give about credentials of all these things. Just to confirm that, I'll go and go to the visual, like my Azure Machine Learning workspace, which I've launched.
And if I go here under compute, you'll be able to see that under the name I've given over there, it gives me the compute and it says running. Okay, and here you can see that there's ideal shutdown, it is not turned on. Okay, ideal shutdown is not turned on. So where basically it will be, it has to turn on. Okay, as we are not using LODS. Okay.
So, we have to delete this soon after we complete the lab.
Got it, understood.
No, AML compute means cluster is like a workspace.
So whatever instance we have created right now, it is just going to make a copy of that.
Here, compute cluster, it is not my original compute which is running. It is just a name of that folder. Inside that, it is going to execute the instances. Like workspace name, I said that it cannot be unique because it is just a platform. Inside, if I train the model, that has to be unique. Just like that.
cluster it, no need for it to be unique.
Here, this compute, no, it comes with respect to all the things, means you can see that it comes with respect to Visual Studio Code, Jupiter Notebook, all of these services, because it is treated as a separate application. One kind of an end, it also has its own endpoint. Here, cluster is not like that, it is like a platform in which we have two nodes of our instances inside it.
That's all.
So next I'll execute that command number 4, 5, and 6 everyone.
Command 4.
Which creates my come.
Okay, it has given me some error.
Compute name is invalid.
OK, local. OK, these things we cannot use any use, ML compute one, add one, no other.
One or any random, we can choose any name.
is 1-2.
Play ML compute one, two, I am going to add.
If you are getting the error, means for 4th command, you are going to get the error. AM will compute in front of that, add some random numerical values. It is going to create the compute. And for this, it is not going to take much time. Okay, soon once that is done executed, execute the command 5 and command 6.
Okay, the infrastructure it is taking time, but it is fine. We are going to understand when we are not going to take time in the next lab.
Okay, the naming convention for the cluster, no?
Okay, let me explain it in a simple way. In the previous 103 clause, we deployed ML. Did we create the ML and deploy it? No, no, there was ML in that region. For that reason, we did not physically deploy any ML. We just requested the quota for that existing ML. Same thing, no.
Here also, if it was does not mattering whether we are giving unique name or not for that, because we just consuming the existing ML from that particular service.
Here, compute instance are already created in the Azure Cloud. We are not creating any new for in terms of cluster. We're just creating a space through which we are going to use them.
Okay, understood. Everyone we deployed a GPT 5.2 in a GPT 5.2 name itself. Did we get any error? No, no. But we created a project in a unique name. Project is the one which I'm going to consume directly. I'm going to give a unique name. Here instance is the one which I'm going to consume directly.
So that has to be unique. Compute is the one which is generalized.
It is like a general compute from the Azure Cloud Service provider.
For that reason, it can be anything. Even if you use AML compute 1-2, you'll get that particular compute created.
Getting it.
OK, next I have to create that ML data set.
And then soon, immediately after that, I have to create this AZ ML create.
You are a fail.
Done.
How many if you're done executing all the six? Anyone still doing it?
Initials.
OK, OK, soon after doing executing all the six, OK, you can come to those things in compute cluster, you can see that I have created from AML compute and it says 0 nodes over there, why?
Why it says I created max max node is 2, no max node is 2, max instance is 2, why it says 0 node over there.
So if you execute anything, okay, if you execute only one, like data preparation, it will say one node. Because it is small workload, it is using only one node out of it. If you initiate with respect to around 1 lakh data set model training process, it says two node you're executing. Okay, because that complexity is big.
It has divided the task into two, like 2 distributed computes, and then given over the understood and individual.
This is not serverless. Here it cannot exceed more than two.
Hi, it will scale. Okay, means what? It will not scale like, okay, it is going to divide and it is going to use it. It is going to 1st use the first compute. First compute's capacity is increased, then only it is going to start the second compute.
Okay, it is not going to start the second compute until this first compute is used. It is kind of a serverless itself, but it will not go more than two.
Yes, but it will not go more than two.
Exactly, kind of serverless itself, but stays within the instance remains same; it remains 14 GB and 14 GB RAM and then 28 GB storage itself.
But then we perform both horizontal and vertical scaling. My here my instance is 14 GB RAM, 30 GB storage. Even that will be that horizontal scaling also will be done.
Vertical scaling also happens.
It depends upon the workload. For example, if I use, if you go to ICT, it is horizontal, means during that call booking, it is horizontal scaling itself. It is going, they are going to interesting to add the multiple nodes into it. But if you go to Amazon, like for whenever we have great Indian sales and all, they do both horizontal scaling as well as vertical scaling.
Understood.
OK, so compute instance, just verify, just verify everyone: compute instance is created, compute cluster is created, come to data.
Under data, you have two entries over there. One is ML table and the other one is URI file. Okay. Okay, if I have uploaded both them, so here you can see that if you scroll down, type, we will be able to see first type is table and file. No, able to see that. Okay, if I have uploaded both, combined both.
into one particular folder itself, then it would be URI folder. Understood? Got the point? Yes, so enough.
We have made our resource ready. Next, what they are doing is they are asking us to clone the repository.
Any issues?
Okay, next everyone. Next, what we are going to do is they are asking us to open the terminal. Where we have to open the terminal, we have to open it inside the compute. Okay, we'll create a Jupiter notebook. We'll initiate that particular notebook stuff. So...
In terms of a machine learning studio, come to the compute. Under Manager, you have compute, no.
Come to the computer, everyone.
Even in the same step.
Okay, here, are you able to see those things?
Like there are seen applications of a compute instance, there are six applications. Jupiter Lab, Jupiter, VS Code Web, VS Code Desktop, Terminal and Notebook. What is this? This compute instance is an actual virtual machine for us. Okay, actually physical, daily deployed virtual machine. That's why it took so much time to create. Understood? Now what we'll be doing, we'll be opening the terminal of that particular virtual machine.
Click upon Terminal, everyone.
Make sure that you are just having that particular.
instruction tab next to this particular.
Workspace tab itself and close all the other things.
Done able to see the terminal.
No, it's fine. I'll compute.

**Subhajit Dey**   43:49
Sir, can you kindly repeat one more time? Where from to open the terminal?

**Kiran Dambal**   43:53
Okay, come to come to under manage, there will be first option which is on as compute.

**Subhajit Dey**   43:59
Yes.

**Kiran Dambal**   43:59
You will see it there.

**Subhajit Dey**   44:00
Yes.

**Kiran Dambal**   44:02
You'll be able to see that your computer state is running.
Yes.

**Subhajit Dey**   44:07
Yes.

**Kiran Dambal**   44:07
So you under applications, what if you click upon these three dots, you'll find a second option which says terminal.

**Subhajit Dey**   44:13
Okay, okay.
No, thank you, sir.

**Kiran Dambal**   44:17
Everyone in the same stage, just beside that particular terminal, there is something called as files.
Able to see it.
Okay, you can open that means what it can see is just like how we have in our laptops, like a user, under user, your name, and just like a file system, here you can see that it has created the same thing, means it is a VM itself, with a proper OS setup. Now what we have to do, we have to clone the same repository which we cloned in the portal.
Okay, here, why we are doing it two times? This is different. That is terminal of Azure portal. This is terminal of the instance which we have created inside our workspace, a complete different space. Understood?
That is only for building our infrastructure.
Yes, so now what I'm going to do is, if you're able to see here, first they're asking us to install the command. We install Azure AI ML, copy the only second line. No need to uninstall because we are using it, you are using it for the first time, means VM is created new. Okay, we are using it for the first time.
Run the command pip install Azure space AI so Azure hyphen AI ML.
No, no, no, first install the command.
Python, Python library, that's all.
This does not affect means this is not depending on my repository.
Web install azure hyphen AI ML.
Okay, so please get in touch, means get into with respect to this environment. I know it is becoming big tactic, but if you practise properly, you'll be able to understand properly. And in a turn, you'll be able to remember it properly. So that will be easy for you to in your exams also. In there in VMs in Yellow DS, it was just, okay, call, read, step and perform it.
Will forget it easily.
OK, done.
You're getting that warning, ignore that, yes.
Here, go to compute.
We are able to see one like bar menu symbol over here on the left side, top left side.
Yes.
Change it.
I would have done some work.
Something.
Exactly.
Can you please help me?
Start on YouTube.
One second.
Here.
So, no.
Success.
Was it the point?
Page and 30.
I see it.
So, after name is this.
And so, I have a lot of experience going to talk about looking at it.
I have a problem.
Cortana.
Okay, everyone, please, if you are lagging behind, please let me know. Okay, we'll make sure that this is the first lab. I know that this will be a bit difficult to follow up. Please let me know that you are lagging behind and we'll be in the same step. We'll make sure that everyone is in the same step. Okay, so once you're done installing the package, next what you have to do is you have to clone your repository.
To clone the repository, they have given the command over in the instructions, just copy that git clone command. OK, this one git clone command, copy it, and then execute it as it is in the next stage.
So, what it does, whatever repository we cloned over there in the terminal, no same repository we are going to clone here, OK, not for the instructions, not for the data, but for the programs, understood.
Okay, you can see that I have successfully cloned. After cloning everyone, on the left side, are you able to see that cloned repository?
It will not be visible. You just have to click upon refresh over there.
OK, once you click upon refresh, then you'll be able to see the clone repository.
Okay, done.
Able to see those folder archive, data, docs, experiment, infra, model, production, source.
On everyone.
Everyone done.
Okay, I know it is a bit tedious. Okay.
It's enough.
Under this clone repository, under this particular folder, ML MS Learn ML Ops. OK, under this particular folder, there is this 4th folder, 5th folder which says experiments. You able to see it? Sorry, 4th folder which says experimentation. Open that, you'll be able to find some notebooks.
You'll be able to find some different different notebooks over there, able to see them out of which first notebook is classification with auto ML.
Able to find it? What is this here? As I discussed, both, okay, whatever services, whatever we have to trigger, whatever model we have to train, whatever data we build in terms of a Azure Machine Learning workspace, that can be done both in terms of a SDK method as well as UI method. Okay.
So here first we will do with respect to SDK method. And same thing, how do we have to do with respect to your method? Even that we'll understand. Understood? What the point? Okay, so our compute is running. We will do the lab fast. So are you able to see that authenticate button over there once you zoom, as soon as you open the notebook, top right corner, there will be authenticate button.
Just click up on that. What is this authenticate is we are supposed to use a proper ID to use the Azure SDK, which is nothing but configuring or connecting directly to the Azure Machine Learning workspace here.
Fail to authenticate.
Okay.
Still ahead.
Big.
Why does it say? Okay, everyone got authenticated.
Please.
So, this was.
Okay. Thank you.
Okay, so why did we click up on this particular authenticate here, everyone? Okay, why are we supposed to authenticate to that particular kernel or Azure SDK? We are working with respect to VM here. Okay, means we have was working on the different OS, means my workspace is not connected to that particular VM. So do you remember in terms of the LODS, what we used to do in the 103, we used to perform AZ login.
Just like that, we are going to click upon authenticate and authenticate to use the Azure SDK. Okay, so next what we have, it is just about executing the all programmes at once. Okay, I'll explain the whole program. You can execute them one by one. First is PIP show Azure AI ML. What it does, it confirms the variable, okay, whether that particular.
Package is present or not. OK, it is just a display part for the confirmation first, but next what we are doing, what is this default Azure credential is used for?
Default Azure credential is used for.
authentication, intra-ID based authentication. Okay, so I have clicked upon authenticate. No, it opened a new tab and it authenticated. Now, I have to load that into my notebook's kernel. Okay, for that I'm using this particular default credential and then storing that credential inside this variable credential. Whenever I want to use the Azure Machine Learning workspace, I'll use this particular variable credential itself.
Understood. OK, now I will just execute this.
Hardly it is going to take around 10, 15 seconds to execute.
Okay, and then the execution is successful. I'm just verifying that credential, whether that particular credential is present or not. If it says found the config file in config.json, the credential was successful, means authentication was successful. Getting it, first three blocks understood. Okay, here the major programme starts.
Okay, the right programme starts. First, what we are going to do, we are going to prepare the data. I have my data in the variable data asset defined as a URI file. Yes or no? You can see that what I'm doing, I'm not loading the directly URI file over here. What I'm doing, I'm using that pointer kind of interface. First, I'm going to the ML table.
In ML table, I have the path of data set. OK, so you can see that type is asset type dot ML table, and then I am giving the path where I have to where you have to find the data. You have to in Azure ML find the data under the variable find not. I am asking about finding the data. I am asking you to find the.
ML table under the name diabetes hyphen training of version one. And whatever data we have over there, that particular data will be loaded and it will be stored inside this variable, my training data underscore input. So here, what we are doing actually, we are first we are authenticated to the Azure SDK.
Then we store that variable into credential. And here you can see that what I'm doing, I'm using that particular SDK method which we have installed, Azure AI ML package which we have installed and which we have authenticated and verified. After that, I am going to load that particular data inside the workspace to my Python directory.
Into this variable, my training data input here. Now tell me, I'm loading the ML table, right? Does ML table comes and sit inside the inside the variable, or does the CS file comes and sits here?
Data set will come and say the ML table act as a pointer. OK, I asked you, I made make sure that ML table is just a pointer. If I go there to the data, you can see that whatever I have inside this.
Yes, while loading the time, it is going to check, take the actual data.
Yes.
So execute that. And next we have configuration. Here, my task building task starts where I'm not going to create the model. I'm going to create the job of executing that auto ML. Okay, for that, you can see that from Azure AI ML package, I'm importing the auto ML. Getting it?
Yes, yes, we can see.
Data, you go and go to the data, you'll be able to visit. Like if you go to data, here you can see that this is data available. And then here you will be able to see the path. Azure AI ML storage URL. Okay, you can see if you copy this path and open it in a new tab.
OK, so this is an API part, sorry.
OK, sorry.
Yes, yes, here in terms of data store inside that workspace BLOB store.
Okay, local upload. Here we have those files. Diabetes data.
Database diabetes dot CS.
Understood? This is my data, which has patient ID, pregnancy, plasma, glucose, diabetic, thickness, insulin, BMI, diabetes pedigree, and then age, which has my input features, and then this diabetic is my output feature. Now, what I'll be doing is I'll be loading this particular data. I'll be using this data to train my model through...
Auto ML. I'm not directly initiating a model training. I'm just creating the auto ML job now everyone.
So here you can see that what I'm going to do, I'm loading this particular method from the Azure AI ML package. I'm loading this particular method, which is known as Auto ML, and creating that particular Auto ML job. I'm defining inside a variable. I'm not creating it yet. Inside A variable, classification underscore job, I'm defining a
classification means while I had said that in terms of auto ML, I have five different types of flavors, means task types, classification, regression, time series, forecasting, computer vision, and then NLP as this particular data set is about discrete data, which my diabetes value does not have a continuous value. It has a discrete value over there. So now what I'm going to do, I'm going to load them as a classification task inside that.
What compute I'm going to use? A ML cluster. It is not compulsory that you have to use a ML cluster. I can replace that with this name also. Here I have this Kiran 1321223, like 1223 to this particular name I have no. I can replace that with this either compute instance or compute cluster. It can work on both.
OK, leave it as it is. Let it work on the compute cluster. It's a, and then what is the experiment name?
Not out the system.
The one you got.
Thank you.
Which one? No, I have loaded that no here.
You are asking about one, in one we have the ML table and diabetes.csv and in another one we have only the CS. CS act as a separate URI file. I can access it as directly with respect to CS also, not with respect to no, it needs not compulsory that I have to go through the ML table and then access it.
Same means it's the same data set. If you go, I uploaded only once, but it created 2 copy of it means one can be accessed through the ML table.
Yes, yes. Okay, so next, after that, in terms of experiment name, as I said in inside a job, I said that it is going to execute or it is going to display everything, whatever we are going to execute. Okay, it is going to display in a specific hierarchy, experiment name, inside experiment name, run name, inside run name, individual child run name, all of these things.
So this will be my experiment name, auto ML class dev, means development, and then training data. Okay, so here I'm giving the path of the particular training data, ML table pointer. And then what is my primary metric? So why I'm going to give a primary metric over here?
Yeah, just not increase accuracy.
Focus on accuracy metric where?
Exactly, so not select means at last I am saying that I want to train 5 models over there. As it is auto ML, it will train 5 models. How it has to display that in a decreasing order of accuracy? If I give RN score, it will display in terms of a decreasing order of RN score like that. So, I am giving the primary metric as a...
accuracy, N cross validation means how many different type of models you want to train. That is fine. Okay. And then model explainability is true. Do you want to explain about that trained model inside the visualisation dashboard? Yes, I want that particular explanation true. Here, am I creating the job?
I'm creating a job, I'm not executing it. The empty means a sample job is created.
job is created, it is not executed. Okay, so now here what I'm doing, I'm just after that, after creating a job, for that particular job, I'm setting some limits. I said that I cannot control which algorithm it can select, but I can control which algorithm it has to restrict using from. That is known as limit. Apart from that, we have...
Time out minutes, max to max, you train for one model, you have to train for 60 minutes. Apart from that, if you're still training, just stop there. If you've trained 3 models, give me output of three models itself.
Okay, max timeout is 60 minutes and then trial timeout is 20 minutes. It means I said 5 models it has to train. Instead of five models, for each model maximum you can give only 20 minutes. Like that. And then max trials is 5 over here. And then last one is...
Early termination, enable early termination in the hence, okay, for example, before initiating or before working with respect to this particular 4th, I'm training 4th model, okay, and then I know that in the 5th model, I'm not going to get good results. Okay, then can I terminate early? Yes, you can terminate early without training B.
Fifth model. OK, so these are my classification limits. Then, here I am going to set the particular training training limit. OK, block the training algorithm. Like you can say that I said that you can restrict the algorithms. OK, if you want to add more, just after the double quotes, add comma within double quotes, you can add.
One more algorithm also, whatever algorithm names you are going to mention over there, those algorithms will be avoided, OK, from taking it or training the peterodonell model upon, understood.
Execute that block, everyone.
Logistic regression is a classification algorithm.
Linear regression is a regression algorithm. Logistic regression is a classification. For a second, even I got confused.
Okay, once you execute, did I create my job here? I created my job. I did not execute. Okay, I've just created the job. So now what I'm going to do, I'm going to execute it. I'm going to create or update. This is going to run that particular classification job. Execute that everyone.
Once you execute that, it is going to give you.
Okay, okay, compute type you have to have given some different name over there.
ML cluster.
I've added.
What was my my name computer?
Okay, I'll give compute instance name itself.
A cluster name you can give or you can give compute instance name. I'm giving the compute instance name.
Okay, so once you have that particular computer instance name, once it is executed, it will give you the link. Open the particular link, everyone. It is going to show you the execution steps. Okay, how, what were the steps it has executed? It says not started, but within a like one minute it is going to start that execution and it will say one model train, two model train. It is going to give you the whole.
Control of that execution.
Change the compute name.
I don't think you have changed.
I have to execute that. Welcome.
One second.
Okay.
Next session.
So, you know, I think it is.
Do you want to miss?
The following.
Soumya.
Hold on.
Okay.
Thank you.
Oh.
I suggest.
Able to see that status everyone running.
Online folks, any issue, any issues, any errors?

**Subhajit Dey**   1:09:42
It's saying setting up the run, that same st.

**Kiran Dambal**   1:09:45
Okay, okay.
Okay, it's going to take more time. Why? Because it is going to train 5 models over instead of 1, it is going to train 5 models and then it's going to give me all the details over there.
Papa.
Okay, in the meantime, it is running, we will have a break everyone. Yes, it is going to take at least 5 to 10 minutes. By the time you are back, it will be executed and please be back in 15 minutes. We have to complete it. We were supposed to complete three labs, at least we will complete one more lab.

**RACE Support** stopped transcription
