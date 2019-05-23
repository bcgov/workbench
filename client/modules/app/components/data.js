import { subDays, subHours, subMinutes } from 'date-fns';

export default {
  posts: [
    {
      title: 'StartUp',
      author: 'Friendly Proof Robot',
      date: new Date(),
      text: 'Welcome everyone to your project space. You can use this project collaboration forum to securely discuss your project with other members of your team. All of the information that you post within this forum is retained within the PROOF secure research environment. If you have questions, suggestions or issues using any of the tools or facilities within PROOF please open a ticket',
    },
    {
      title: 'Model Development Progress',
      author: 'Peter S.',
      date: subMinutes(subHours(new Date(), 1), 13),
      text: 'I have completed the initial estimates using training and test data sets based on candidate features using the k-fold cross validation technique. Thus far I have trained two models, but am not satisfied with their prediction performance. I believe this is primarily associated with patients that have received treatment for subacute sclerosing panencephalitis prior to 2015. A couple of patients ( PEIs 71c0f992-8099-4ee6-ba49-3b08c5901689',
    },
    {
      title: 'Interim Project Reports Due',
      author: 'Jennifer L.',
      date: subMinutes(subHours(subDays(new Date(), 3), 4), 35),
      text: 'I will be sending a project interim report to NSERC in hope of securing additional funds for 2018/19.  To assist me in compiling this report I would appreciate it if everyone on the team can reply to this post with their individual interim estimates of prediction by the end of the week (Feb 7).',
    },
  ],

  news: [
    {
      title: 'What was the distance measurement method?',
      content: '(Joshua P.) By popular demand we have added Weka support to Jupyter Notebooks!. Weka is Java software that provides a collection of machine learning algorithms and tools for: Regression, Clustering, Association, Data Pre-processing, Classification and Visualisation. You can now leverage this software within R kernels thanks to the installation of the R Weka package. To learn more about Weka and the interface provided via the R Weka package consult the following resources. https://www.r-bloggers.com/r-talks-to-weka-about-data-mining/ https://cran.r-project.org/web/packages/RWeka/index.html https://www.youtube.com/watch?v=Qm2awEsYfuE'
    },

    {
      title: 'Daily aggregation and quality assignment code is now available.',
      content: '(Jim S.) We will be conducting system upgrades early on Monday, February 1st, 2018 – between 6:00 and 8:00AM.  Please be aware that any long running processes will be terminated prior to this upgrade and authentication and data services will be unavailable for the duration of this outage.',
    },
  ],
  datasets: [
    {
      title: 'Challenge Selected Air Quality Monitoring Station',
    },
    {
      title: 'Provincial Pharmacy and Nearest  Air Monitoring Station Distance',
    },
    {
      title: 'Population Adjusted Daily Respiratory Drug Dispensation by Pharmacy',
    },
    {
      title: 'Verified Hourly PM10 Air Quality Measures 2013-2016',
    },
    {
      title: 'Air monitoring stations and locations',
    },
  ],

  notebooks: [
    'Exploratory Data Analysis',
    'Experiment and metrics design',
    'Predictive modeling',
  ],
};
