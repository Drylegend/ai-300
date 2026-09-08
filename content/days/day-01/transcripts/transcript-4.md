**AI10  Module 16  Machine Learning Operations Engineer Associate – AI-300  Kiran Dambal  Day 1-20260905_154521-Meeting Recording**

5 September 2026, 10:15am

1h 3m 5s

**Kiran Dambal**   0:06
Settle down everyone. Hardly we have one more hour.
OK, whole day we were able to complete only one lab.
Everyone done with this execution completed? Okay, very, very important point is about in terms of this lab. In terms of a 103 lab, it was a process. Here, more than process, the results are very important in terms of your exam point of view. Okay, please concentrate. Here, when we talk about this particular execution which is completed, you can see that there is completed status which has given.
So, let's go, Vince, when we talk about this visualisation which comes for our progress, no, it comes with respect to various different different sections over that. OK, let's explore them one by one. In terms of overview page, you can see that it says completed, created on all of these are just like logs, OK, whatever have been created. OK, but you can see that.
It gives you the small, like, all the different different tags. What is the fit time for it? What is the iteration? Okay, pipeline ID, pipeline cost, okay, run algorithm, all of this. What are the different algorithms it has selected? It has selected like GBM, XBoost classifier, extreme random trees.
Voting ensemble, and then stack ensemble. These are the five different top algorithms, classification algorithms it has selected for this particular model training process, and then after that you find other details. This is just an overview page, everyone. OK, and if you go to data plus guardrails over there, let it load.
You can see that.
It has, I, what, what are you able to see over there?
Class balancing, missing feature values into imputation, high cardinality feature detection. What was the high cardinal feature in admin my data set?
Patient ID was the high cardinal data set. Yes or no? Did I give any command over there to remove that?
I just gave the command saying that what is my output value? Output value I said diabetic. Apart from that, I did not say anything to remove other. So here one of the even more core important feature of this particular auto ML is pre-processing is also done internally itself. Without even my intervention, pre-processing is also done. That is the proof. First what it did, it checked for class balancing.
OK, all the classes are balancing, means what happens is sometimes some classes means will have a less number of rows, some class will have more number of this with this. What I'm going to do, I'm going to find the missing values. If is there are there any missing values or not? Then if I find any missing values, then imputing those missing values.
Okay, after that, finding the high cardinal features means if you have any specific issues or any specific inconsistencies in terms of your data, everything will be automatically handled once the data is prepared. Even soon after running is started, there under the tagline was featurization initiated, means it has started the feature engineering part.
Means it was doing all this particular task. It has it passed, passed, passed. OK, then click upon models plus child jobs, everyone.
In terms of the particular model plus, we can see that they have, it has selected five different algorithms and trained a model upon those five different algorithms. OK, first one is voting in symbol, stack in symbol, light GBM, OK, XG boost classifier, and then extreme tree classifier. Why it says max AB scalar over there before all of?
Toast the algorithm.
So it's just...
It is just about the normalisation implemented upon before feeding it inside that algorithms. Those algorithms expect the data to be normalized. OK, so here, these out of these five algorithms, OK, what means, as I said, my evaluation metric was accuracy. You can see that with respect to accuracy, it is giving me in the...
descending order. First algorithm is 95.3%, second one is 95.329%, third one is 95.18%, 4th one is 95.18, 5th one is 83.3%. Okay, in designing order it is giving me the model option and also it gives me different hyper parameters in which it has.
trained those values. Like if I click upon these things, you'll be able to see that particular JSON part also. What was the data transformation involved? What was the training algorithm? How it got involved? All of that particular part. Getting it. And next, here, what you can do, you can download this also. So once I click upon download.
What you'll be able to do, you'll be able to download that voting and symbol model pickle file. Okay, so whatever means top model, you can see here, I've selected this voting and symbol. If I click upon download, I'll be in my local system, I'll be able to download the pickle file, trained pickle file. What all I'll get, okay.
So basically, if I'm even registering the model, I'll be able to upload that for just your understanding. I'll explain what all I'm going to get inside that folder.
Yes, code we cannot see.
So we just about the output, final output. Pickle file we have, which is my actual trained model. I said there will be one configuration file. Okay, here you can see that. Conda YAML file, which will be having me all the details, means in which environment it was built. Okay, so this is my environment, okay, project environment, dependency, what is a Python configuration it is.
Python 3.10.19 and then what are the different PIP commands over that means what are the different Python packages installed over there? All of those things. This is my configuration file, YAML file. And then apart from that, we have this scoring Python.py. What do you mean by scoring method?
from which particular programme we can call that method, call that particular trained model, means the programme which uses that trained model. You can see that this is the program. What it does, it is going to make a prediction. If I execute this program, it is going to load that particular trained model and then run these different, different values. You can see over here.
What it is doing, it is creating a data sample and then testing the particular model. Okay, means whatever pickle file we have, it is going to lower that model and then execute it. That is, that particular method is called as scoring model, scoring script. Understood? So these three files I'm going to get whenever, either it is registering to the workspace
or downloading that particular trained model, we have these three files. These are what these are called as artefact trained artifacts. Understood, clear about this.
I'm going very in detail so that you can understand every perspective, every point of view of this particular machine learning workspace. Whatever model you train, either you train with respect to notebooks or you train with respect to auto ML or you train with respect to designer. So this is common thing.
Understood. Now, after that, go to output plus logs, everyone.
Which one?
Some.
Yeah, that's what we said that particular part. We said that explanation of a model in programme equal to true. Okay, the one which is going to explain about that particular instance means what type of a model, which particular means on which compute it was trained, that it is about compute model, not about the trained model.
No, if you want to create any new instance over that.
Okay, and view generated code, so basically what it does, it creates a particular scoring script itself.
You can see that script to run that particular whole trained model. OK, so you can ignore that.
Let me go back. Come to the output plus logs everyone. In terms of output plus logs, you'll be able to see that auto ML drive.py means what was the particular programme executed to initiate this auto ML. Okay, to initiate this particular whole model auto ML job that you'll be able to see over here.
And then definition of a original JSON means what was the different, different parameters which I have initiated and which were triggered of that particular JSON we have. And then in terms of outputs, okay, in terms of featurization, you'll be able to see the actual data means what are the, here, you will be able to see that multiple different, different pickle files, right?
What are these? These are my built-in machine learning models, train pre-trained machine learning models, you which are used OK to perform the featurization.
Got the point? This way output folder will be common for every model training you do on the Azure portal. Yes.
OK, so next.
If you go to the child jobs, you'll be able to see all the different different jobs. I trained for five models, right? There are more than five, like 5 child jobs over there, why?
OK, we have almost one, two, three, 4, 5, 6, 7, 8. We have six child jobs over there. Why?
Sorry, 8 cells of so other why?
We have trained 5 models; there should be only five child jobs. No, why 8 child jobs over there?
Three were not normalization, three were featurization. OK, for featurization, it checked for the class balancing, it checked for the it means it worked for the missing data imputation, as well as the high cardinal feature extraction. For that, it is going to execute one job. As I said, every run, every minute execution you do on your.
Azure Machine Learning Platform, everything will be captured. OK, so that is a those sales jobs are approved for it. Understood. Got it.
No, no, like random name will be given for them.
This one.
Command, these were these three were command means the one which was executed. These last means these are first three jobs executed. These 3 jobs are for that featurization.
So these are my model training process.
ML feature, OK.
That was initiation of a featurization, I think. There will be separate command prompt execution, which will be done for the individual featurization executor. Okay, so even if you go for everyone, switch for jobs, everyone. Okay, are you able to see that auto ML class dev?
If you click upon jobs on the left side, able to see that auto ML class dev. Remember, this is the exact same name which we gave in the experiment. Whatever execution you do, that execution will be done under experiment. In the same experiment, if you do the second, it means if I execute the same thing again, what it does, inside that execution, it is going to create a
Run!
I have executed only one stop. If I go back to the particular notebook, if I execute that block again, what it does, it creates a new entry in this. OK, inside this, I'll be able to see those eight child jobs.
Understood? Got the point? This is how the machine learning workspace work everyone and this is how the auto ML works. Any questions on this?
Shot.
Yes.
Confused.
Voting.
Too much to handle.
What happened?
You can give me some inputs if you want to change the training method, I can.
That's what I said. No, AI 103 is more difficult compared to AI. Sorry, AI 300 is more difficult to compare. I even I took almost around six months to learn this properly.
Yeah, if you practise it two to three more times, you'll be able to get a good grip about these things. And one more thing, everyone, come to the pipelines.
Okay, are you able to see anything in the pipeline? Did we create a pipeline? We did not create any pre-configured pipeline over there. If I execute something inside the designer, means build my whole execution pipeline. That will be visible here inside the pipeline. Auto ML is just a job. Okay, it is not a pipeline which I am creating. It is a...
automated execution job created with respect to that tool called as Auto ML. Okay, so that is that does not come under pipeline pipe whatever execution I do under notebooks or whatever execution I do under whatever model I build on my own under notebooks and a designer that will be listed under pipeline because those are the components which I build with my own.
Whole execution flow understood, got the point, everyone, OK?
Or else with InDesigner also if you build any pipeline that also will be listed over here. That will be means whatever pipeline I create, okay, that will be listed here. Whatever if I execute that pipeline that will be listed inside a job.
OK, understood about these parameters, everyone. Any questions on this?
Sharma.
I don't get that assurance from your faces.
Okay, just after going home, I'll keep it very slow. After going home, please practise it once. We have very good ample amount of time. Okay, means there are only 11 labs in this course. Okay, they have given less number of labs for a reason.
OK, so practise them and make sure that you understand every pointer given over there about these labs. Got it? OK, one more thing. OK, we'll learn about this, how to configure the same thing through the UI. Understood? OK, everyone on the left side, click upon Auto ML.
As of now, we have already created one Auto ML job already through the SDK method. Okay, so even if I start a new lab, we'll not be able to complete it within time. So we'll wind up with this lab today. But what we are going to do from tomorrow, we will increase the pace a bit.
Tomorrow almost we have to complete how many labs? Six labs.
Mhm.
Yeah, good.
Got it.
Okay.
Okay.
Networks.
Me.
Seven.
The one thing very thing is like, these labs are not depending upon each other, like saying that not replica of a previous lab to give a home assignment also.
More of, we have to do 6 labs, 7 labs, actually, one, two, three, 4, 5, 6, 6.
We'll try to complete 5 labs tomorrow. Okay, so anyhow, it's all about learning the same things. We'll not go through 3D. We'll try to complete 5 labs. Okay, one lab.
There is no one like something like which is every lab is unique itself over there.
Okay, no, it means assignment also, yeah, we have to do it. What we will do is, so we'll not give it as a home assignment. Okay, any one specific lab, I'll say, while performing it here, you keep on taking screenshots and append it in a Word document, and we will consider that as assignment. Understood? Okay, and anyhow, in the GenAOps, we have less number of labs. There we have...
Okay, there also we have labs, 6 labs we have, but that will be covered as you already know with the foundry interface. You already aware of a fountain and all that will be covered soon that we can increase the pace, but this we will learn very detailed and split of this GenAOps and ML Ops is like 60% is ML Ops, 40% of the questions will be GenAOps.
Okay.
OK, auto come to the auto ML everyone. Let's understand how to build the same thing with the UI online folks on the same page.
Hello!

**Subhajit Dey**   17:08
Yes, sir.

**Kiran Dambal**   17:09
Okay, thank you so much for the confirmation. Click upon this. Are you able to see that new auto ML job, automated ML job?
Yes, click up on that. OK, now here what it is asking is in terms of a basic settings. First, in the training method, it is already selected because training method is my auto ML. OK, next in the basic settings, it will ask me for all those details which we have added in the program. OK, apart from that, we have to configure some other default details.
We'll explore that.
Ohh.
What we can do?
Through notebook what I said I can create auto ML job through SDK also through and UI also.
Through notebook, what we did, we created a job. We did not create a trainer model. We created a job. Yes.
UI. Okay, everyone. Yes, so for me it says mighty arm.
Okay, I remember Mighty Raj.
During my childhood, it was a cartoon. Okay, you can name it something or you can keep it as it is. I'll just name it as Kiran, some 2, two, three, 4, two. Okay, and name you give as a unique name. Okay, any random name you can give. Experiment is create new. And if I click upon start existing, what it will do?
If I click upon start existing, it will select this, it will ask me to select. Okay, so if I click upon create new, it will ask me to create new. Okay, if I select this one, what it is going to do in the same experiment, it is going to add it as a new run. Click upon start select existing one and select that one which was selected means which we have created already.
And these are my basic settings, no need to give any description over there. OK, and then click upon next.
What is my task type here?
Okay, I was the fast no.
Speak it.
No, no, no means once we registrar it and host the model.
Here, only able to see this last. We just trained it. We didn't even register those models. Once we register and host it, then it will be available and same.
We just trained it and we didn't even save it. OK, if I register, it will be saved. OK, and then if I host it, then it will come inside the endpoints.
Exactly.
Done. Everyone, anyone still it is loading.
Okay, next click upon next. What type of a task it is?
Classification, we will be using the same data set, diabetes data set. Click upon classification, and here you can see that the data is already selected over there, which is about ML table. If you want to select that, click just OK, means we have to select that, select that.
Click upon next everyone. Now what we have to do, we have to give the task settings. Apart from these minimum, bare minimum details, what are the other things we have defined? All those we have to define over here. What is the target column?
So it is going to list all the columns over the last column, which is Boolean, which is diabetic.
Select that, and then if you want to train it as a machine learning model, you have to select, no need to click upon this cheque box. OK, here I want to train it as a machine learning model itself. OK, I'll give, I want to train five different models with respect to five different algorithms. I'll not select it. As I said, a machine, this machine learning workspace is we can build.
deep learning models, we can build like machine learning models and also we can work with respect to fine tuning of LLMs. Okay, so it is possible to train deep learning models also. Now as of now we ignore that and then here we have additional configuration settings able to see it. Click upon that.
Here, you'll be able to see primary metric.
So there are multiple different different metrics. Just select from the top down as a accuracy. OK, explain best model. Yes. OK, whatever best model I want the explanation of that. And then enable ensemble stacking. OK, I don't want that particular ensemble stacking. Use all supported models. Yes. Block the models. If you want to block any models, you can select those things. For example,
I want to block some of the models like logistic regression. I'll just say block it.
Understood. Next, click upon save. Make sure here it is accuracy. If and here, it should be some algorithm. Okay, whatever you want to choose, you can choose and click upon save. Then just beside that, there is something called a featurization setting. You want to see it? Click upon that.
You can see that feature type, it is going to detect auto and all of that particular part means what it is doing, it is just giving you the highlight of what is the data we have uploaded. Understood? Then click upon save. If you want to change, you can change it. For example, what type of a data it is. I've just, by default, all the things are
Auto means it is going to sell, means it is going to detect on its own. OK, instead of that, if you want to insist on giving that pretty specific type over there, you can give that particular part, then click upon save.
Yes.
And there, are you able to see those limits? Yes, click upon that max trials. OK, how many maximum algorithms you want to train? Give it as five. OK, it will take too much time. Give it as three, everyone.
Then, max concurrent trail. OK, so as we are using compute cluster, you can use a concurrent trail if you even if you don't give. OK, if you use a compute cluster, it is going to use a concurrent trails. OK, max nodes. OK, how many nodes you have? You have only two nodes. OK, you can define that or you can leave it as it is. Metrics grow.
Threshold. OK, for example, here, what do you mean by threshold?
limit or a specific benchmark. Okay, if your algorithm is going more than 80%, then only select it or else choose a different algorithm like that. Okay, I'll leave it as it is. Experiment timeout in minutes, give it as 60. Iteration timeout, give it as 20.
Enable early termination, click the cheque box, validate and test. Okay, so as now, validation type, it is automatic based upon the type of a data we have uploaded, based upon the task type we have selected, based upon the algorithm it is going to select, it is going to decide the validation type. Understood? I'm going to leave it as automatic.
Test data, it is none. OK, so as of now, what I want, I don't want any specific test data to be initiated. If you want your models to be tested, also means upon the live categorization of a split. OK, then you can use that train test split. OK, it is going to take more time. Keep it as none itself. OK.
Sem.
then click upon next.
So here, select the compute. So what type of a compute we have created?
They've created compute instance as well as compute cluster. Either, yes ma'am.
Thank you. Have a big day for you.
Sem.
Thank you. Thank you so much.
OK, so select this particular compute instance, everyone.
What happened?
Internal joke.
OK, so like either you can go with respect to compute instance, or you can go with respect to compute cluster, because we have created both. OK, so for faster execution, we'll go with respect to compute cluster. OK, so by default, in the in that particular drop-down, it will be already selected, as because we have created only one compute cluster over there.
Okay, and if you want to create new, that is also available. No need to do that. We have already created our compute clusters. Then click upon next. Here it is giving all the details over there, kind of a reviewal part. If you want to review all those things, just make sure that all the details are fine. And then click upon submit training job.
What it is going to do, it is going to initiate the training job just like how it got initiated in the previously executed through SDK method. Here also we can do the same thing through the UI method. Submit the training job everyone.
Okay, tomorrow everyone please come on time, okay? 930. We have 6 slabs to complete.
Or else today will you stay till 5.30?
When my question was not completed yet.
Okay, any of we have time, but designer is not included as a specific official lab. We'll practise the train to train the model in designer also. Okay, means it has, it takes too much time, but at least we'll understand how to build that pipeline and how to run it. Means running it will take some time or configuring it will take too much time.
We'll just understand how that interface works, okay, soon after this.
Notebook is just like normal Google collab. We did that already, no? So instead of that programme watch, we have executed creating a job. If I use this kit learn package and then trained a model over that, that is notebooks.
means compute was created. Okay, then inside a compute, I opened a terminal, cloned my repository and opened that particular notebook. So instead of opening that notebook, if I opened some other notebook, like which is used for training the model, okay, when that was just exactly like the same thing.
Cheers.
I plan will be done in terms of designer.
Notebook also means now through notebook I created the auto ML job.
Through notebook, I can create a designer job also.
Means through notebook and through designer we can create a pipelines.
Notebook is just an interface, like a Google Colab or Jupyter Notebook. OK, so there, what are we going to do? Whatever programme I write, it is going to execute. I can directly write the programme which trains the machine.
Okay, 2 minutes everyone. I can directly write a machine learning programme which trains and saves it in that local. If I save it, where it will be saved, it will be saved inside that VM, inside that particular compute. Okay, that is notebook. But through notebook itself, I can write a programme which can initiate an auto ML job.
Through notebook I can write a programme which can initiate a designer job also, designer pipeline also. So if you want to create a pipeline either it can be possible through notebook or through designer.
OK, and if you want to create this particular auto ML job, it is possible either through notebook or through auto ML job.
Understood.
Welcome, welcome.
Subhajit.
I just drink one glass of water.
Go to.
I have to get over to you.
What is that?
Do you love?
Okay, soon after this lab, no? Okay, everyone, please, while you're exploring this machine learning, Azure Machine Learning platform, while you're building it, always have a habit of deleting the compute, not stopping. Even stopping will mean stopping in the sense the compute will be stopped, but still storage cost will be running. Always have a habit of deleting the compute as soon as your work is done. We can create it again.
How many times do we want?
workspace will keep it as it is. It is not going to charge anything.
Yes.
Yes.
Real, sir.
Yeah.
Remote Desk.
See.
Yeah, I think this is good.
Bing.
Hear me.
Okay.
Bill.
Think that you want demo.
everybody.
Because.
Go on.
Sorry.
Thank you.
Thank you.
I want to see you.
Team.
Okay, and one last time I'm saying, please don't take this AI 300 Certification as simple as 103. It is going to be a bit difficult. It is going to be a bit harsh. Okay, so please properly understand the labs and properly learn about the dumps.
Then clear it. Okay, 103 dumps are accurate. 300. I took almost around 25 minutes to clear 103 and took whole 120 minutes to clear 300.
Okay, so content syllabus is got updated. It is made easy, but questions are not that simple. Concepts are simple. Concepts are a bit easy compared to DP 100, but questions are even like, they are same as difficult as the previous one.
But you can clear it if you properly perform the labs, understand the concepts, and then learn the proper steps. One thing which was shocked even me was in around 3:00 to 4:00 questions for my exam, they had given, they did not give me the options as a words, okay, characters. They gave me the logos.
Of those services.
At least, like three of the logos, I knew one question, I just blindly marked it. I don't know whether it was right or wrong.
And one of the very important disadvantage of this particular whole Microsoft exam is we never know what is the weightage of what question. In the back end it will be assigned. You just have to score around 700. Your goal is to perfectly answer all the questions. Okay.
Yeah. How that like division of the score, whatever, for example, I scored around 890 for this AI 300. So how that 890 was assigned were what question, even that they did not answer. And which question I answered right and which concern I answered wrong, even that will not be able to get.
Get to see.
Play Roopavani.
In all Azure exams, you can open the Microsoft.
Then, give Chatterjee.
I went to this week, no, like previously, this Monday to Friday, Monday to Friday, I was in Hubli for offline training in courses for freshers, I was training agent TKI. I asked one of the freshers, like they joined, like they were joined this, I think they were 2025 pass outs.
I asked which browser you use for one student, means one fresher. He said, Chatterjee.
Bye.
Okay, my job is completed. Everyone done with the jobs? Okay, so here are same things. Whatever you observed over there, same things you'll be able to observe here also. And one of the important, one of the important observation is if you go to that particular jobs, okay, and in the same experiment team, you'll be able to find the two runs. One, the run which was initiated through SDK method.
and one the run which is initiated through my this particular approach.
Why it has only six jobs over? OK, I have done now three as my models.
I have said only to only to train three models, that's why it has given six jobs.
In the drop.
Good.
Depressions.
Exactly.
Call.
about
OK, let's not.
I just.
Yeah.
Hi, everyone.
As you said.
Okay, sorry I missed explaining you. Everyone open the previously executed job.
Open the previously executed job, come to the child jobs.
Inside that.
Started.
One second, everyone.
Inside this, one of the job will be something like this one, second one, command, which has the drop down to it. If you open that, there are two drop down, means model explanation and then RAI. Okay, RAI is nothing but responsible AI dashboard. Okay, so what do you mean by responsible AI everyone?
We discussed about this in 103. What are the six principles we have?
Transparency.
That's all my college.
I can see your.
Fifty, 60 marks going away.
OK, first one is privacy and security, and then reliability and safety, transparency, inclusiveness, accountability, and...
Fairness. Okay, those are the six different responsible AI principles. Similarly, that is for a consuming of the AI models or training the AI models. But here when we talk about responsible AI dashboard, it gives me all the other details. It is still running, but when we talk about model explainability, you can see the model explainability, which...
gives me the output plus logs. Here in terms of a standard text, it explains the whole logs.
We just metrics.
Yeah.
Model explained.
OK, this is.
Ahmed.
It should give me some data under this child jobs itself.
Stonish Shinu.
Sorry, but...
Not this, I think it is still building.
Okay, so it has created a programme to explain the whole model, I think.
Thank you.
And.
Thank you.
You go one thing.
The photo from Support.
Hey, Bob.
Thanks.
Sem.
As well.
Hello.
Good.
Register model instance here in the models we have no option. So if to host the model, the model has to be saved or registered to the workspace. To register it will be visible over here in type models.
Okay, now what do you do?
No, it will not automatically means, for example, you have trained 5 models. No, which one you want to save? All 5, we cannot save. I don't want to save all five. Okay, so they have given the option to the user which version of the particular model training you have, you can register and then host it.
Chase Field.
Two.
You.
Mm.
Every time.
Sure.
It's not built properly.
Check.
Yes. Ah, at this normal part. Test results, we have not tested that.
And I was just checking about that.
Explanations.
I need a pitch.
B.
Now, these are the like accuracies which will be checked for all the models. Out of these different accuracy I asked, based upon the accurate means of these different metrics I have, which particular metric I have to log to maintain the descending order. So out of which is my accuracy, that is fine.
I'm checking for that responsible AI dashboard. It is not created. It said it got error.
Nice.
She casted.
Chicago Tops.
Thank you very much.
So far.
Technical.
Okay, leave it.
Okay, everyone, so got the output for this? Yes? Okay, concentrate now. Now let's understand. Okay, so we'll be not able to train it because it takes a lot of time to train the design means build a complete, fully fledged working pipeline. We'll just understand how to build that particular pipeline, how that interface works.
Okay, so come to the designer everyone. On the left side there is something called as designer. Are you able to see it?
Click up on that. Here, you'll be able to see that classic built and custom built. In terms of classic pre-built, there will be something called as plus button or that create a new pipeline. Able to see it. Click up on that. It is going to open a canvas for you like this.
Yes, so you can name it something like, ohh, we are trying to save, give some random name, then click upon save.
You can click upon this pen button over there, just beside your name, name of the canvas, and edit that name. If you want to edit it, you can edit it, else it's fine.
Okay.
Done? Okay, now let's explore this particular interface. On the left side, are you able to see those two sections, data and components? By default, you'll be inside the component. Come to the data part, everyone.
Here it says no data assets found. Okay, but we have uploaded 2 data rate. Why it says no data assets found?
Here, whatever components, whatever module we have to add, we have to add it as a component, means something which can drag and dropped. Okay, so we don't have any component. We created them as a file. We did not create them as a component. If I go to components over here, I have nothing over there. It's just empty. If I create a component which is going to read that particular data,
which is saved in my URI file or ML table, then it will be become that particular data set will be visible over there. Okay, so if I come back.
So, here, come back to the components, able to see there are different different types of components available. First section is sample data, yes, select that.
There will be something called as diabetes data, everyone. Search for it.
Oh, diabetes they have removed, I think.
Okay, import the weather, the weather data set everywhere. There's something called as weather data set input. Just you click upon that, drag it and drop it in the canvas.
Yes, got it. Okay, so now after this particular data, I have added the data. Okay, next what I have to do, I have to pre-process this, right? So if you close this, okay, sample data.
Next, we have the under data transformation, we have 19 components over there able to see first, let's select that particular first column. First one is...
Ohh.
No, no, no. Select columns in data set.
Load select columns in data set. Here, there's someone you can search also. You can now on top of there is a search bar. Search for select columns in data set. The copy, not copy, just pick it up and drag it.
And then what you have to do is to build a pipeline, you just have to...
Hold your cursor on that particular dot of a weather data, drop it to this particular data set cursor point. Here it will be connected.
Able to see.
Got this point? OK, now here, if I, yes, please.

**Subhajit Dey**   52:30
So.
Uh, so, where we got the weather, sorry.
Understand.

**Kiran Dambal**   52:40
Okay, sure. Okay.
Kiran.
Under sample data.

**Subhajit Dey**   52:46
Under sample data, OK.

**Kiran Dambal**   52:46
You have this, you have this under West section, go with the alphabetical order, we have weather data set, drag it and drop it, then close the sample data, then we have data from transformation, there we have select columns in data set.

**Subhajit Dey**   52:55
Okay.

**Kiran Dambal**   53:02
We can search also above, we can search also done.
Right click upon that weather data, Reva.
Right click on weather data component. Are you able to see that preview data?
If you click upon preview data, you can see that what are the data set, what data set it has. It has airport ID, year, month, date, time, time zone, sky condition, visibility, weather type, dry bulb, Fahrenheit.
Dry bulb Celsius, dry bulb, wet bulb Fahrenheit, wet bulb Celsius. These things will be used for weather calculations.
Okay, so all this we have.
Altimeter is my final column, right?
Probably.
Okay, so we are not building actual model over here. We're just understanding about building a pipeline. Next. So consider that if you double click upon that particular select columns here, it gives me the option here. What I have to do, I have to give that particular actual column names from the previous weather data set, which columns I have to select, ignoring what columns. Okay, no need to add anything.
We're just exploring how to build it. If you want to actually build it, you have to add the column names which you want to import for the model training process as a input and output features. Both you have to add here. Understood. Next, you can add a clean missing data component.
There is a clean missing data component.
Clean missing data component, drag and drop it. And then after that, you can add what else we have normalised data. We have normalised data. We can add cleaned data. In terms of a normalised clean missing data, there are two output ports over there. One is cleaned data set and the other one is cleaning data set.
OK, I don't want cleaning data set. I want complete clean data set itself. I don't want streaming process here. Complete the whole execution and then feed me. OK, at the once itself. Then I'm using the particular clean data set connecting to the normalized. OK, and again, in terms of a normalised data, also transform the data set, transforming the data set.
You can see transforming transformation function as well as transformed data set. OK, I want the transform data set itself. OK, where I'll search for split data, everyone.
Split data.
and then load it. So here you can see that my pipeline has weather data, weather like data component for weather, then select columns, missing column, normalise data, and then split data. Everyone added to the split data.
Anyone lying behind?
Dividing them into train test split. If you double click upon split data, here it is asking for the division. If you give 0.7, 70% will be for training, somewhere 30% will be for testing. Okay.
Custom code.
Means we can add those things. Means we can define our own components also. We can create our own components.
Done.
Add it. Okay, next what we have to add.
We have to bring a algorithm first. OK, so here, what type of a data we have added?
It is a regression data. No, weather details is nothing but a regression data. Here, there we have a algorithm somewhere.
Fifth or machine learning algorithms, search for a linear regression, everyone. We have linear regression over there.
Pick it up and drop it over there. Or else you can select for any other regression, not logistic regression. Logistic regression is not a regression algorithm. Okay, after that, train model.
Train model. Here, train model needs 2 inputs. One is a model algorithm and the other one is a training data set. First output will always give a training data set. Second port will always give a testing data set. Now, consider that my model will be trained successfully. After that, what I have to do, I have to test it for that score model.
Drag it, drop it. First input of a score model is my trained model, whatever pickle file I have that. Second input is from this particular split data.
It should be like this.
G.
1.
Yeah.
You want done? Here, I'm going to get the results of the particular training. Means I'm not going to get the accuracy all of these things. I'm just going to get actual values and predicted values. Now I need a component to evaluate it. Search for evaluate model.
Evaluate model, drag it, drop it, and connect it.
Connected to the first output and then second output it is not configurable. Just leave it as is and then search for save model.
Okay, save model component has been removed. Okay, it's fine. We can define our own component for a save model and then we can do it. But this is how we are going to build a pipeline.
8.
Score is less than so, we can do that, we can, we can give the whole control back to the starting initial training with the score is, means we can initiate here while configuring and submitting here in terms of runtime settings, we can execute that, define that.
Getting it, everyone.
So here, what did we do? This is just a means we did not perform. We are not, we will be not able to execute it because you can see that there are so many errors over that means missing values over there. So for that, we will be not able to execute, but this is how we build a pipeline. Once we build it completely, authentically, and then if I click upon configure and submit,
Here the same thing, what we did in terms of auto ML job, filling the details about compute details, all those details too. Then we'll be able to review and if I click upon review and submit, the whole pipeline will be submitted for execution.
Getting it? Okay, so whatever I'm building it now through UI over here, for the same thing I can build it through Python program, through notebooks, Python SDK also.
Understood. OK, so now I've created my pipeline. I did not submit, but still it will be visible over here. You can go to the pipelines.
Okay, I have not configured it. If I configure and submit it.
It's auto-saved.
Here it is. But if I submit it, execute it, I built it, but if I execute it, that will be visible over here inside the pipelines. Understood.
What's the point, everyone?
Any questions on this Azure Machine Learning?
Okay, prompt flow is something using which we control about the different different prompt monitoring or prompt in terms that comes in GeniOps. We'll discuss about that in the next Saturday.
We have which one here, train model.
If I double click upon train model here, we have input settings, output settings, runtime settings.
Yeah, that's what they have migrated this to Foundry.
Everything will be in terms of foundry itself now.
Understood about designer, everyone.
Yes.
Okay, so we were able to only do one lab. Please come with a very good motivation tomorrow. I know that it is Sunday. Okay, so please, we have to do at least five labs tomorrow. It's going to be heavy lab intensive session tomorrow. We'll learn in detail about machine learning. We'll complete the most concepts.
And we make sure that we'll understand the concepts, okay? We make sure that everyone executes all the labs. Yes? And please come tomorrow.
Okay.
Any other questions everyone?
Shot.
Okay, so assignment, we have not done anything today. Tomorrow 2 labs itself will consider for the first two assignments. Understood? Okay.
Online folks, any questions, any doubts?
Online folks, any questions, any doubts?

**Subhajit Dey**   1:02:50
No, good for Nissar.

**Kiran Dambal**   1:02:52
Okay, great. Thank you so much.
Okay, so let's wind up for today, everyone, and if you have any questions, please do let me know.
I.

**RACE Support** stopped transcription
