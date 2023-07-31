This repo is an example of Next.js application demonstrating AWS IoT TwinMaker and Matterport integration using AWS IoT App Kit library. 

![DEMO](./docs/images/demo.png)

## Introduction 

With the AWS IoT TwinMaker and Matterport integration, developers can now leverage Matterport’s technology to combine existing data from multiple sources with real-world data to create a fully integrated digital twin. 

You can use Matterport spaces in your AWS IoT TwinMaker web application by using the AWS IoT application kit library. 

[Link to the video Youtube](https://broadcast.amazon.com/videos/832879)

## Getting started

We assume you have imported your Matterport space into a TwinMaker scene and have a Cognito user with all the permissions to fetch the scene. 

Watch the video above for a step by step guide to set up the required resources. 

1) Configure your application by providing the required information in the file [aws.config.js](./aws.config.ts). 

![AWS CONFIG FILE](./docs/images/awsconfig.png)


2) Then install the libraries using the following command: 

```bash
npm install --legacy-peer-deps
```

3) Finally launch the application using the following command: 

```bash
npm run dev 
```

Once you sign in using the credentials of your cognito user, you should then see your Matterport space. 