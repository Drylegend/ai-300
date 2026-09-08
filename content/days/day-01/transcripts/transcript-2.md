**AI10  Module 16  Machine Learning Operations Engineer Associate – AI-300  Kiran Dambal  Day 1-20260905_121120-Meeting Recording**

5 September 2026, 06:41am

57m 18s

**Kiran Dambal**   0:11
Okay, everyone, first, so in this next chapter, we are supposed to explore one particular tool of the Azure Machine Learning called as automated ML. Okay, automated machine learning. Before that, let's get in touch with respect to this machine learning resource first. Okay, so everyone open the URL called as...
portal.azure.com. Before that, okay, I'll do a few other details I have to share. First of all, I'm going to share the URL for also I'll be adding that in the chat. All the details you are just migrated in the WhatsApp chat. Okay, first of all, I'll share this particular URL, Microsoft Learn URL, just to like how I shared it for 103. This is for a...
Yeah, 300. OK, so in this you have these courses like details. As I said, this course is divided into two parts, like that is the first one is ML Ops and second one is Genie Ops. We are inside this particular ML Ops. OK, we have completed the first chapter. We'll be starting with the second chapter over here, the experiment with machine learning. OK, and then we have some other chapters, like totally around 7 chapters over there. Three will be completing, means 4 will be completing today and three will be tomorrow.
Okay, so first and that is the link which I'll be sharing in the
This.
Okay, so this is the one. And next, so in the previous LODS, in the previous learning, whatever we used to do, right? So in terms of LODS virtual machines, we had our instructions on the right side. We used to follow those instructions and we used to perform the steps one by one. Okay, it's not like it's only available in the VM.
So we have a dedicated directory itself for that particular instructions.
You can see that as in this particular first, like first section, part one, we have 7 labs over there. Okay, as I showed today, we are going to perform three and tomorrow we are going to perform 4 labs. Yes. And in terms of the particular 7 labs, you can see all of the instructions are given over here. And this first one, post-wear case study.
I'll share, I'll share. So this postwash case study, this you can ignore. This is the one which means if you just click up on that, it's the same thing what we discussed with the one person will explain it through video over there. Okay, you can ignore this particular first one and all the other labs will be performing. And these are the three labs which will be performing today. Okay.
finding best classification model with Azure Machine Learning, optimised model training with respect to Azure Machine Learning, and perform hyperparameter tuning with sweep job. So these three we'll be doing. And then if you click upon that link over there, you'll find those instructions as it is.
The only thing is we'll not have that number, point number. Apart from that, the whole instruction is as it is. We'll follow these instructions and we'll be performing the same thing in the Azure Machine Learning platform. Understood? Got the point? Okay, so I'll share this link also with you.
This is for the part one. We do not have any labs of a Gen AI Ops here. OK, Gen AI Ops. I'll share those things in the next class. OK, next week understood. Cheque whether you are able to access that link or not.
Done.
Able to access that? OK, so we'll come back to that instructions, but so we'll, as of now, we are going to explore the machine learning workspace for this. There are no specific instructions given. OK, follow my steps, everyone. Everyone got the access.
One more has to come now. Where is he?
Okay, leave him.
Okay, so first open this URL called as portal.azure.com. Bookmark this. Today and tomorrow we'll be in this particular platform itself. portal.azure.com. Log in with your account.
And then...
Done. Homepage.
Everyone is in the homepage.
Yes, OK. Now, same thing on the left side, you'll be able to see, create a resource, able to see that, click upon that, create a resource.
And here it'll be inside the like marketplace. Once you click up on that, search for Azure Machine Learning.
And one more thing.
Okay, I don't know whether it is a good habit or bad habit for sure. Here, the questions will not only about the concepts, it will also be about the logos of that particular service. Remember the logos also properly. There were two questions, means around 25 days back, I took AI 300 exam.
There were two questions upon this logo.
Okay, so what they did, they did not in options, they did not give me the service name, they just give me the logos. So this is the, okay, that particular conical flask symbol is my Azure Machine Learning logo. Understood.
Click upon that, and then click upon create. Once you do that, it is going to give you the specific form over there to create a resource. Yes, able to see it. OK, here.
First thing is resource group, create a new resource group. Okay, add some, like give a name like machine learning workspace 001002, whatever it is. Just click upon new resource group, MLWS001. Yes, please.

**Subhajit Dey**   6:02
Awesome.
Also, there is no subscription coming up. It's blank.

**Kiran Dambal**   6:09
It's blank for you.
Did you enable that SOP like student account?

**Subhajit Dey**   6:15
Student account, it said like it cannot verify Kiran right now.

**Kiran Dambal**   6:21
Can you share your screen for a minute?

**Subhajit Dey**   6:25
Yes, I actually closed that. Let me go to that page and then I will, I can share. Okay, let me share.
Adminisssion.

**Kiran Dambal**   6:35
OK, others create the resource, everyone, and I'll explain. OK, while complete one small explanation, one second, Subhajit.

**Subhajit Dey**   6:43
Ohh, I'm sorry, I'm sorry.

**Kiran Dambal**   6:44
It's fine, it's fine. I think you shared already.

**Subhajit Dey**   6:49
I'm stopping sharing.

**Kiran Dambal**   6:51
No, no, it's fine.
Okay.
Okay, everyone wants, like, we'll just small explanation about this particular form. Resource group, we have to create new, and today what you are going to create, same thing you will use tomorrow also. Okay, and one more thing, name, and here, like, for other all resources, okay, whatever resource we are going to create. So we are, we are.
to be very specific about the name. Okay, there should be no duplicate name, there should be no other name globally, so that we can create a unique endpoint about that. But in terms of Azure Machine Workspace, whatever name I give, even you can give the same name to it. Because it is not about something which we can consume. It's a platform which we are accessing. Okay, workspace which we are creating over that.
Inside workspace, if I train a model, and if I want to host a model, that model's name should be unique.
Understood, because we are going to consume that through the URL. Workspace, we cannot consume through the URL. For this, they should be, it's not compulsatory, the name should be unique. You can give same name, which I'm going to give. And then region, okay, so make sure that you have to use the same region, which we have verified, that is East Asia, or else for which you got the access earlier.
Okay, some got Australia, Southeast, same region we are going to deploy. And then apart from that, apart from this particular details, are you able to see those three other details? The one which says storage account, key vault, and application insights. So these three are default resources which are created.
While creating the Azure Machine Learning workspace, getting it, so these are the three default services without even means then they will be created once you create the Azure Machine Learning Storage Account for storing the data, whatever model you train that will be in a pickle file, so to store that we need some storage component, whatever data you...
upload to train the model. To store that data, you want some storage component. For that, we use storage account. Key Vault, it will be your means it will key heard about Key Vault everyone. What is Key Vault?
Exactly, it is kind of a one extra step of verification. Whenever we host the model, we host the model, means model will be hosted upon our environment and we have to consume it through endpoint and a key, right? That key act as my authentication credential. I can store that authentication credential inside the key vault, first authenticate to the key vault, then authenticate to the model. It's kind of a...
one extra step of verification. Okay, that and the application insights. Application insight is I think what that is the actual service using which I'll be able to perform the monitoring aspects, monitoring the model, monitoring the data, monitoring the model training process, monitoring the versions of the different different models. All of these things are done with respect to application insights.
And then last one, which is optional, it is not compulsory. Last one we have, which is known as container registry. What is this? It's kind of a hosting environment. Okay, whenever we want to host our application, whenever we want to train and host our model, okay, that particular time we need container registry. As of now, it is none itself. Okay.
Do not create container registries, understood, but three default resources along with Azure Machine Learning Workspace is Storage Account, Key Vault, and Application Insights. Getting it? OK, create that everyone, I'll solve the issue here.
What is the word?
Cut images.
Exactly.
No, no.
It's kind of a creating a Docker image of that which will be used for hosting.
Yes.
It's kind of a building my pipeline and then which will be used for the hosting part.
Yes.
Subhajit, you can share your screen.

**Subhajit Dey**   10:51
OK, C.

**Kiran Dambal**   10:52
Okay, whatever name is given over there for a storage account, keep it as it is. It says new and it assigns some name, starting with your name which you are given for the machine learning workspace. Leave it as it is and click upon review plus create, then create. Creating of it will take at least around 4 to 5 minutes. Wait for it.
Unable to complete Azure for students, please try again shortly and OK.

**Subhajit Dey**   11:15
So, so it is saying unable to.
Process that request, so I just tried.
Trying again, so shall I try signing out again?

**Kiran Dambal**   11:27
Okay.
OK, even if you try again, it will give you the same thing, no?
Yes.
Yes, because there there is will be no like policies are implemented. Okay, Subhajit, do one thing. Okay, you have a credit card.

**Subhajit Dey**   11:58
Yes, credit card I do have.

**Kiran Dambal**   12:00
OK, so go to a portal dot iduzhdioijoizoutlookfr.
Sign in. Okay, start free trial.
Start click up on that.
Rai Azure for free.
Keep it quick.
Okay, others who don't have a student account, you can observe. Add your job title.
OK, e-mail address.

**Subhajit Dey**   12:38
This one, the RACE logo.

**Kiran Dambal**   12:40
Ohh.
Outlook ID also you can add.

**Subhajit Dey**   12:45
Like, uh, will there problem if I add this one, this?

**Kiran Dambal**   12:48
No, no, no, do do one thing: go back to the portal, Azure portal, go back to the Azure portal.

**Subhajit Dey**   12:54
Okay.

**Kiran Dambal**   12:55
First, first put up, first up. OK, click upon that your account over there on the top right corner.
Okay, now you click upon the sign in with a different account.
Now log in with your Outlook ID. Click on use another account. Log in with your Outlook ID.
First option, I think, yeah.
Sorry, it was configured.
Calling everything, just came up, we have on both.
Okay, so now what you're doing?
Okay. Okay.
OK, click upon start.
Play also for free.
Yeah.
Okay.
Okay, give you a job title and e-mail address, the same Outlook ID.

**Subhajit Dey**   14:20
But here it is, this RACE REVA only coming up. Will there be a problem?

**Kiran Dambal**   14:26
Oh, is that why it's coming like that?
Okay.

**Subhajit Dey**   14:33
Here it is, this Outlook ID on, but when I'm...

**Kiran Dambal**   14:36
Okay, click on start.

**Subhajit Dey**   14:39
Leaving a start here.

**Kiran Dambal**   14:42
Play for Raj, try Raj for free.

**Subhajit Dey**   14:44
It is still showing sign in only.

**Kiran Dambal**   14:47
No, it's fine, it's fine. Here you can click up on sign out, sign off, click on sign out and click on sign in again.

**Subhajit Dey**   14:49
And here it is coming.

**Kiran Dambal**   14:55
Okay, now choose Outlook ID. Pick an account which you want to sign out. Okay, no, no, no, no.

**Subhajit Dey**   15:03
Sorry.

**Kiran Dambal**   15:04
Okay, you signed out the Outlook. It's fine. You can go back, refresh.
Click on that account now.
Pick on your account, your Reva account.
Okay.

**Subhajit Dey**   15:24
Here on the right.

**Kiran Dambal**   15:26
Why it's not giving you to sign out this and sign in back with Outlook?
Okay.
Okay, it's asking you to sign in. Sign in with the Outlook ID enough.
Call Reva.
Yes.

**Subhajit Dey**   16:22
It's.

**Kiran Dambal**   16:23
Okay.
Personal use, and then personal use.

**Subhajit Dey**   16:25
Ohh.

**Kiran Dambal**   16:34
Do you still?
Okay, company name is optional. You can add if you want.
Once the browser is verified, the next button will be enabled. Click up on that.
Yeah.

**Subhajit Dey**   16:50
Okay.
So.

**Kiran Dambal**   17:11
Totally.
It takes around one or two minutes.

**Subhajit Dey**   17:24
Focusing.

**Kiran Dambal**   17:29
Good.
OK, for those whose deployment is already completed, how many resource you are able to see that?
Five resources, but we created only four. No, we gave a name for ML Machine Learning workspace. We gave a name for storage account and application insights and key vault. One more extra thing will be created, which is known as log analytics over there. Yes or no?
Able to see.
There are five resources created. First one is machine learning workspace. Second one is storage account, key vault, application insights. One extra thing is log analytics. Able to see that? Okay, log analytics is nothing but there are, it is a sub-resource of application insights itself. Okay, it is used for monitoring the different, different time stamps through the logs.
Bye.
Application insights will be used for monitoring the logs. Log analytics capture the logs. Application insights will give you the insights about that particular whole application.
Hosting everything will be done in the machine learning, Azure Machine Learning workspace itself. Okay, in that particular workspace itself, hosting will be done. Storage account for data storage, irrespective of pre-training, post-training, post-deployment, whatever data interface comes, that will be in the storage account. And then...
The.
Then a key vault is for one extra step of authentication of a deployed model. Application insights and log analytics for monitoring aspects. I'll explain the whole thing.
Yes.
And this field has...
No, no, no, that will be too much.
No, no, today, one, one, today, one day it will cost around $18.00 or $17.00.
Okay, I'll do one thing. How many of you are not able to, there are a few, only one, and Subhajit, you, and who else is does not having the access, student access now?
Okay, can you ping me the e-mail ID in the that Team?
Subhajit, leave this, ping me your e-mail ID in the teams.

**Subhajit Dey**   19:52
Okay, okay, so the Outlook one, right?

**Kiran Dambal**   19:56
Outlook one, Outlook one.

**Subhajit Dey**   19:58
Okay, I will.
Stopping my sharing them, sir.

**Kiran Dambal**   20:03
Yes, yes, yes, I'll share my screen.

**Subhajit Dey**   20:06
Okay.

**Kiran Dambal**   20:08
Okay, everyone, 2 minutes we will resolve so that everyone is in the same step.
No, no, Prakash, not the not the Reva Outlook one.
You.
OK, Subhajit, share your screen. Can you share your screen? My part is done.
OK, Prakash, whatever Subhajit does, you just follow that.

**Subhajit Dey**   22:07
I guess so.

**Kiran Dambal**   22:11
I think you have received a mail from my ID.

**Subhajit Dey**   22:14
Yes, I am.

**Kiran Dambal**   22:15
Go to the Outlook.

**Subhajit Dey**   22:17
Trying to sign in with the site.

**Kiran Dambal**   22:18
Log, yes, yes, Rai.
There is something called as activate button inside it.

**Subhajit Dey**   22:32
But.

**Kiran Dambal**   22:34
Of course.
Subhajit, you are signing into the Outlook.

**Subhajit Dey**   22:43
Yes, sir, I'm signing in to work.
Outlook e-mail ID only I will be receiving that right?

**Kiran Dambal**   22:49
Yes, yes, something went wrong.
It said e-mail sent for me.
Some of you.
I just copied and pasted. I did not verify. No, not this one.
VW 16 Outlook add direct. No, no, this is just a principal name.
But it is it means underscore is nothing but at the rate itself.
Is this your outline means it's the same ID, no?
Check, refresh, go to spam once.
Click on your second account, 91.
Manager, open the Outlook, no, no, close this, close this window.
Close this window.
K here.
Yeah, inbox.
Okay.
Junk e-mail, junk e-mail.
Yes, cheque in a junk e-mail.

**Subhajit Dey**   24:47
Yes, is it Linta?

**Kiran Dambal**   24:48
Ah, yeah, visit link, no, no, no, no, click upon accept invitation.

**Subhajit Dey**   24:53
Yes, I accept invitation. I click then visit LinkedIn.

**Kiran Dambal**   24:54
Thanks.
Okay, okay, okay.
OK, OK, click upon accept invitation.
OK, keep your authenticator ready. Accept.
No, no, I use another account.
Sign Outlook out. Log in with that Outlook ID.
And directly it is, are you for you? I think it's logged in, yes. OK, great.
Next.
Cancel.
Yeah.
Sign in, yes. Stay signed in, yes.
OK, so open a new tab. OK, open a new tab and open portal.azure.com.
Okay, I have added you as a users in my own subscription. Okay, so use it only for this labs, okay?

**Subhajit Dey**   26:17
Trust me.

**Kiran Dambal**   26:23
Use open portal at iduzhdioijoizoutlookfr and use that login Outlook ID.
Okay, once you logged in, wait for a small instruction, one last step.
Sem code.
Verify that.
Zohomail.in - add that e-mail ID.

**Subhajit Dey**   26:51
Yes.

**Kiran Dambal**   26:52
Okay.
OK, it's taken sometime, it's fine.
Yeah.
Okay, top right corner.
Top right corner, click up on that.
Yeah, click on that switch directory.
Switch directory.

**Subhajit Dey**   27:53
So.

**Kiran Dambal**   27:54
Okay, it's in a default directory, it's in my directory. So now you can go to the home. Okay, so on the left side, there is a bar symbol, menu bar symbol, click up on that.
Click up on home. We can now click up on create a resource. Same thing.

**Subhajit Dey**   28:06
The.

**Kiran Dambal**   28:10
Search for Azure Machine Learning.
Last one.

**Subhajit Dey**   28:23
Yes, now it's done.

**Kiran Dambal**   28:24
Create, create.
Okay, do one thing. You create a resource group. Create new resource group. No, no, no, no. Create new. Click upon create new. Add your name.
Okay.
AMB.
No, switch with respect to that my DM, the one it says Kiran, Namal Kiran, yeah, so switch, okay, ML W.
Okay, review plus create.
Three plus, that's all, that's all.
Review plus create.

**Subhajit Dey**   29:17
Uh, so it will be created in East West 2 only, right?

**Kiran Dambal**   29:19
Hi, it's fine, it's fine. I have access for all regions.

**Subhajit Dey**   29:23
Okay.

**Kiran Dambal**   29:23
OK, everyone, I think done creating resources.
Okay, once validation is cleared, so you'll get that particular create button enabled.

**Subhajit Dey**   29:31
Yes, I will.
Sure, sir. Shall I stop sharing?

**Kiran Dambal**   29:37
Yes, yes, please.
Okay, everyone, so once you create that resource, okay, now let's explore the workspace. I hope everyone has created the resource. Now, we'll do the lab after the lunch itself. Now, in 20 minutes, we are going to explore in detail about how that particular workspace, and this is very, very important. I want everyone to...
Concentrate. OK, I'll give you time to explore, but look into the screen. OK, as soon as you create that particular, if I go to resource group.
And if I go to resources.
Okay, this is my workspace means resource which was created. Apart from that resource, you can see that there are other details means like ignore these other things like these last five. Whenever we create the Azure Machine Learning workspace, it is not a one resource which is created. Along with it, there are four more resources which will be created.
Application insights for monitoring, application insights for monitoring, log analytics for capturing all the time stamps. Okay, and then the storage account for a storage operations means which comes with respect to BLOB container access, and the key vault for a extra one-step verification for hosted models, whatever model you host for that, and then...
Azure Machine Learning resource is for my launching the workspace. So we'll come to that particular workspace and then click upon Launch Studio. It'll be in the overview page. If you click upon Launch Studio, what it is going to do is in the new tab, it is going to launch the Azure Machine Learning workspace for you.
This is the place, this is a platform as a service, okay, where I'll be able to build all of my machine learning models. And it is not compulsory that nowadays, only the machine learning models we have to train, okay, it works for machine learning models, it works for the deep learning models, and it works for training LLMs also.
SLMs and ML training is also available over here in terms of this particular part. Are you able to see that? Okay, now this is the homepage. Everyone is in the same homepage. Okay, now don't.
Here, in the are you in this, this scroll down, there's something called as Launch Studio.
Okay, I want everyone to observe my screen now. Okay, I'll give time to explore that, but observe this. I'm going to explain the whole features of it. It's hard to remember for the first time, but please.
Done everyone in the same page? Okay, so now no need to do for you. I'll explain the things. First of all, when we talk about model catalog, as I said, I can build any of the LLMs and SLMs for me. Okay, whatever models we were able to observe in Foundry, you know, all those large language models are available over here. For what, not for consuming.
for retraining, for fine-tuning purpose. I can add my own data and I can fine-tune those models. So those things are available over here. That does not concentrate upon means this does not come under our AI 300. Okay, in terms of Azure Machine Learning.
With base model, foundry model, foundation models.
We can retrain upon that, perform fine tuning upon those things. Okay, ignore that. That is not our general machine learning workload. Just below that, we have different, different sections. First, we have authoring section. Next, we have asset section. Next, we have manage section. These are the three core sections involved in terms of machine learning workloads.
When we talk about, like, first one is authoring. Authoring is nothing but creating or training the model. To train the model, ignore the prompt flow. Prom flow is the one using which we are going to do fine-tuning of the LLMs. Okay, we are not touching that as part of this course. Okay, ignore the prompt flow. We'll understand about that in the Gen AI Ops.
Okay, so to train the machine learning model, to build the machine learning model, we have three options over there. Notebooks, then designer, then automated ML. Yes? Okay, so in terms of our notebooks, what it is, it is just like our Jupyter Notebook interface, Google Collab or Jupyter Notebook interface.
where we'll be able to train and build the model through the Python notebooks that is.ipynb interface in terms of the block by block execution.
Getting it, then we have Auto ML. Heard about Auto ML.
So basically, auto ML is a thing, but you do not have to do anything. No need to write the program. No need to do anything. You just have to come with the data, select the flavor. We have 5 flavours over there in terms of this particular Azure Machine Learning workspace. First one is classification, then regression, then.
time series forecasting, then computer vision and NLP. Okay, clustering is also there as an extended flavor, not a built-in flavor. Okay, so we have these five flavors. Out of this, we are going to select one, and then we have to select the target column, which is the output column. Only these three have to select. Everything.
training the model. It not only trained one model, it trains around, it selects, okay, it observes your data, learns about your data patterns, and then decides, well, if you say 5, it trains top five models, it selects top five algorithms and trains 5 models for you. Sorry, trains 5 models for you, and then it is going to give you the option
to choose which model you want in those trained 5 models. That is Auto ML, means a kind of a totally low code, no code, automated solution to build a model without any interaction with the user. You just have to come with your data type of algorithm, then and then.
target column as well as how many models you want to train. Everything else will be done by model itself. At last, you'll be able to see five models over there. Getting it? That is our auto ML. That will be our first lab. Okay, we'll do that. We'll learn about that in detail. Then we have something called as designer. Heard about canvas building everyone.
Okay, how many of you have seen, like not seen, how many of you used teachable machines?
Only one. Okay, teachable machine is nothing but just a UI kind of interface from Google, which gives us the experience of how to train the machine learning models or deep learning models. We were like, it's kind of a dragging and dropping the components. In the slide, you saw that particular component normalized, okay, define the problem, normalise data, split data, algorithm, train model, score model, UI model.
What we did, what was that? It was like a pipeline, right? Here also in terms of a designer, what we can do, we can create those pipelines.
Okay, we had, okay, some interface has been changed. There were some sample pipelines also. Means directly a pipeline means drag the component, drop it, drag component, drop it, connect to those components.
Yes, just like an interface where we drag and drop components and then connect them. And then if you click up, once you connect the full pipeline from loading the data to evaluating the model and saving that particular model, what happens, the whole things will be like fully fledged pipeline. And if you click upon train, one by one, block by block will be executed and model will be trained.
It is kind of a gaming interface given to you to learn how to build the models. Understood? So these are the three different authoring tools. These are the three different platforms using which we'll be able to train the models. You will be able to build that particular model. Then we have assets.
Okay, these are the platforms where we train. But to train the particular model, we need different, different assets, right? Okay, that we have over here. Under data, if you click upon data, everyone, click upon data, we have two options, data asset and data store. Okay, how many of you trained your machine learning model or deep learning model with the multiple different, different CS files?
input CSV1, input CSV2. Have you done that? Okay, sometimes we do that, okay, to maintain the data training, data set into different, different batches, like a parallel processing or like sequential processing, batch one, then feed batch two, then feed batch three, like that. Okay, when you have multiple data files as a folder,
You choose Data Store.
Understood, and if you click upon data store, there will be always four default data store already stored over selected over there.
Got it? Okay, like a folders. They're just like a default folders. And whatever work you do, whatever model you train, model you save, everything will be stored inside that particular workspace BLOB store. That is used to store, okay, you train the model and you save the model in the pickle file. Where actually it will be stored? It will be stored inside this.
workspace BLOB store. It is kind of a directory, like a folder. Then we have data assets. Inside a data set, any CS file you upload, any specific data you upload for training purpose, that will be visible over here under data sets. Remember, under data, we have two options. One is data set.
And the other one is data store. Data set is my individual data files. Data store is my folder directory in which I can upload all the other different different files. Got it? Understood? Next.
****.
It will be accessed under data store under this workspace BLOB store.
Yes, yes.
Okay, if you manually upload means if I just manually create my data, that will be visible over here under data set.
Okay, they are in a preview, I think still. It depends upon region also which services are available. Okay, ignore that. Which are in preview, we will not use. And then we have something called as jobs. Okay, what are jobs everyone?
Jobs are nothing but executions. Any minute execution you do, okay, for training model, I'm going to do one execution. For hosting that model, I'm going to do the second execution. Monitoring the model, I'm going to do third execution. Any execution you do, okay, whatever execution you do in terms of machine learning workspace, everything will be captured under this particular jobs.
Understood? Any runs, okay, any execution, any runs, whatever you do, that will be captured as a job. So it will be like experiment, under experiment, runs. Okay, under runs, sub jobs. Okay, where all the means everything will be hierarchically captured. Okay, how you are going to execute and how you are going to execute.
Train the model. Understood. OK, then we have components. What are components? Components are nothing, but these are my blocks. I said in terms of a designer, I'll be able to drag and drop the components and connect them. Now, already in terms of the designer, it comes with almost around...
350 to 400 built-in components. But sometimes I want to create my own custom function. Okay, I want to include my own custom function and add it inside designer. For that, you can create the particular component over here under the component section. Getting it?
Next, we have pipelines. Any predefined pipelines you build, okay, or you create for a model training process, okay, which has to be retrained, which has to be re-initiated, okay, like fully fledged working pipeline, that will be available under the pipelines. Then we have environments. What are environments?
What are the environments?
OK, what is V and V?
It's a virtual environment, right? Whatever package I install that, it is staying inside that virtual environment itself, not anywhere. Okay, now, similarly, to train one particular NLP application, what are the packages I need?
I need TensorFlow, I need Keras, I need some LSTM, I need some all of these different different methods, I have to install them. Here what happens, these environments are nothing but those, these are my virtual environments in which already those packages, everything are pre-installed. You can see on the right side here, okay, for a specific use case, means in terms of description,
For ML Flow, Azure ML Minimal. OK, and if you scroll down for every different different use cases, they have configured the predefined environments over there. Getting it? OK, which comes with respect to by default it comes with respect to its own OS, its own Python libraries, everything already pre-installed.
So those things are called as environment specifically. Are you able to see those two tags over there, curated and custom environments? Curated are nothing but for commonly used workloads, they have already built those environments. Understood? But if you are not satisfied with respect to all of those environments, you want to...
your own customization. Okay, for that you can go with respect to custom environment where you can create your own by defining what is a OS unit, what is a framework unit, whatever Python kernel unit, what are the Python libraries you need. All of those image you are going to create of that particular execution environment. Understood? Got the point?
Okay, next we have models. Here, in terms of a hosting that particular model, we have two things, right? Before hosting, what I have to do, I have to capture the image of that particular model.
Yes, how many of you worked with ML Flow?
No one. Okay, in terms of ML flow, there are different, different, means we have ML flow dot log parameters, okay, log artifacts, and then log model. When we log the model, what do we do? We save it as a pickle file. Not only pickle file, we use one more file which is one as config, which has all the details, in which environment it has trained. What are the dependencies for it?
how to execute it, how to, what are the input parameters for it, what are the output parameter of it, everything in terms of that particular config file. Okay, we learn about it. So what we have to do, we have to register the model to the platform first. Before hosting, we have to define, okay, for example, same model means for same application, consider that I'm doing.
diabetes prediction. I can maintain multiple versions, right? I can train version 1, version 2, version 3, version 4. Out of four versions, version 3 is the one which I'm going to host. Before hosting version 3, I have to register that, okay, this is the model which I want to save until and unless all those models will be in a cache memory itself.
I have to save that particular model inside my default workspace, BLOB storage. Okay, then after saving, then I have to host it. Once you save the model, once you register the model to the platform, or that particular model will be visible over here.
Getting it? Yes. And after that, after registering it, then in the endpoints, what do we have? We have that particular models which will be hosted.
In terms of our endpoints, you can see there are two options. I mean, there are four options, but two are the one which is related to this particular machine learning. One is real-time endpoint and the other one is batch endpoint. If you fine-tune the model and host it, that will be available in Azure Open AI. Okay. Got it? Understood these assets. Next.
we have something called as manage. Under manage section, we have 4 resources. First one is compute, second one is monitoring, third one is data labeling, and then 4th one is connections. In terms of this particular compute, this is a very, very important concept. Papa, there will be at least two questions upon this particular page.
observe and listen properly. And if you want, you can take it out. Here in terms of a compute, what are these? These are my computes, means these are my computational paths. Either you want to create a CPU or you want to create a GPU, you have to come to this particular compute. Means if you want to train the model, you need a compute. If you want to host the model, you need a compute. If you want to
build or if you want to pre-process your data, you need a compute. For everything, we need a compute. For that reason, we have a compute and there are five different types of computes available.
Getting it? Let's understand them one by one now. Very, very important. OK, first type is compute instance. OK, whenever this is a bare minimum type of a compute available in terms of my Azure Machine Learning workspace, where if you're working with respect to very simple workload, OK, no parallel computing needed.
no complex architecture needed. For that particular part, what do we do? We use compute instance, comes with respect to only single compute instance, single processing unit over there. Got it? That is called as compute instance. Then second one we have, which is known as compute cluster. Compute cluster will be the one using which we'll be able to.
means perform the parallel processing. For higher workload and all, what do we do? We divide the data into batch and we perform the parallel processing. Yes or no? So that particular time, compute cluster is kind of the one space which holds multiple compute instance together. I can, means in compute instance, if I create,
I can create only one instance, but in terms of a compute cluster, what I can do, I can create a group of compute cluster. What is the meaning of cluster?
groups, yes or no? So I can create a group of compute instances. If I say 4, 4 compute instances will be created, which will be executing parallel.
Understood for parallel processing for distributed computing, we use compute clusters. Then we have Kubernetes cluster. Whenever we are going to work with respect to containerization or a container image model deployment and all, that particular time we use Kubernetes cluster.
Got it.
And next, we have attached compute. OK, one simple understanding is attached compute is nothing, but it is a combination of a compute instance and compute cluster. Which one will be costly in among both compute instance or compute cluster?
Compute cluster will cost, because it is kind of a more mirror images of a same instance multiple times in compute cluster, but sometimes in terms like they just imagine the microservices, not mix machine learning model training process itself for data pre-processing, do we need high compute?
But what model training we need high compute, but still what data pre-processing we need compute. OK, in this particular simple situation itself, I am in the situation where I want to use compute instance still one stage and then compute cluster from the other stage. Attached compute is a thing, but this is that particular type of a compute where...
You can, we can decide for what step the compute should be instance and for what step the compute should be cluster.
Means it is kind of a hybrid compute.
Got it, yes. So, by default, what it does when we create our test compute, it creates a compute cluster itself, but for data preprocessing, if I say compute instance, if it creates 4 instances in compute cluster, it'll turn on only one.
OK, and remaining 3 will be turned on while I initiate the model training process. For a hybrid execution of a compute, we use attached to compute. Got it? And last one is serverless instance. What do you mean by serverless instance?
when it will be used.
Heard about serverless - what is it in cloud infrastructure? What do you mean by serverless?
Exactly means the either vertical scaling or horizontal scaling that will be done based upon the workload. Okay, so basically in terms of this particular, we get this particular issue called as 502 bad gateway. Have you received it? That happens due to...
lot of traffic in terms of that particular application. If I use serverless compute, what happens? Based upon the requirement, based upon the need, either it increase or decrease the compute capability. Okay.
For example, when we take about the standard DS11V2, that is one of the compute which we will be using continuously for today and tomorrow. In terms of that particular compute, what do we do? We are going to use a 14 GB RAM, okay, 14 GB RAM, 28 GB storage. This can be increased or decreased.
Okay, it is not fixed over there in the serverless compute. It can be increased or decreased based upon the size of a data upon which I train. That is what we call it as serverless compute. But the thing is, it is a costliest compute.
As it is an automatic vertical or horizontal scaling, it is the costliest compute in terms of Azure Machine Learning. OK, only in one lab I think we are going to use this. What the point? Yes.
OK, so now most of the lab will be using either compute instance or compute cluster itself. OK.
Serverless in the sense means there is no specific defined configuration for it. Okay, it means that is a common name given for such kind of a situations in whole cloud environment. Yes.
Okay, and then when we talk about monitoring, in terms of a monitoring, this is where my application insights and log analytics comes into the picture. Okay, where if we want to monitor, here I don't have anything. If I click upon monitor, it will not give me any options. Means monitoring will be only for that particular. Either you have to initiate a model training process.
Monitoring the model training process or monitoring the deployed model that is done in terms of monitoring part, and next we have data labeling. OK, here data labelling is nothing but here heard about coco files.
Coco files are the one which using which will be able to define my own data. OK, so kind of a model training process, preparing my data and all. So if you want to create your own synthetic data and all, we use data labelling section. And last, we have something called as connections.
Here in terms of a connection, okay, so you can see that by default we have 3 connexions over there. First one is the Azure ML global data sets. Okay, sorry. I mean, in terms of a data sets in a sense, there are some predefined data in the designer.
When we talk about this particular Azure Auto ML Studio and Designer, there are predefined data for experimentation and learning purpose that is loaded from that particular Azure ML global data sets. That is a common connexion in every machine learning workspace. Second connexion is the workspace blog server. Where did you see this?
Workspace blog, so where did you see this?
This used to see it in our data store. Under data, there were two options, data asset and data store. Under data store, we had this particular workspace blog. So that means whatever work we do, it will be stored. And what is the authentication type over there? Account key. Okay, storage account key, we are going to authenticate. And then workspace artefact store.
Okay, that is also was available in visible means was displayed inside my BLOB store itself. If I go to data and if I go to data stores, you can see over that first and third.
Okay, workspace BLOB store and workspace artefact store. Okay, what are these? These are my built-in connections, means storage account we created. No, inside that, these default BLOB containers are already created. For them, the connected. Apart from this, if you connect this particular whole Azure Machine Learning to Synapse Analytics, that connexion will be visible here.
If you connect this to the Microsoft Fabric or Azure Databricks, okay, or any other external Azure services, all those connexions will be visible over here. If you want to click upon Connect, you can see that.
Everyone click upon connect, you'll be able to see multiple different different options over there.
Yes, if you want to connect any external resource, okay, to load the data or to append the data, okay, for that, you'll be able to connect it over here. Understood? This is my Azure Machine Learning workspace. And very important point is to remember over here, to train the model, we have three options known as
Authoring tools: one is notebooks, second one is automated ML or auto ML, third one is designer, understood? Yes, OK, so...
Let's go for a lunch break. Soon after the lunch break, we'll start with the lab. Okay, that to exploring that auto ML. Very important concept, everyone. Yes, got the point. And soon after completing today, we'll delete the resources just because we have limited credits.
And they said.
Yes. Here it is, we did not deploy anything. It is not going to charge anything. If I create a compute, then it starts charging. If I train the model and store that model in my storage account, then it starts charging. As of now, it is just an empty folder created there.
It will not charge anything for me now.
Until and unless you start working.
We are not consuming anything yet. It is just a blank workspace. For example, okay, in terms of this particular event, like all the different, different services and all. If you create, if you store something, then only they'll start charging us. No, I have not stored anything enough. Even though this particular workspace BLOB store, if I go here.
And if I go to data store, these default it is created. No, if I go inside that, it is empty. It has nothing in it.
OK, you can see that the data store contains of no files.
So nothing will be charged as of now.
Desk.
Where you are talking, include?
Means archived in the sense already, which whatever you have loaded means you have something you have created, you did not deploy it, did not create it, you just kept it as cache.
Component.
Main something which you have the created. You did not click upon create. It is stored over there as a temporary. So as of now there is no archived over here. Even if you click upon include archive, there's no nothing over there.
Then everyone understood about workspace.
Any questions on the workspace, everyone?
Online folks, any questions?
OK, let's have a lunch break. Soon after lunch break, we'll start with the lab. OK, any questions on this before that?
Anyone finding too much?
Okay, it will be too much for the next four days. Please brace yourself.
Okay.
They're already created means predefined.
If you start, then it is Anshu.
It's very expensive.

**RACE Support** stopped transcription
