# Gujarati-Sign-Language

## Samvaad (Team: entropy)

![image-20240909095150960](./public/chart.png)

**Samvaad** is a React Native-based application that integrates with various microservices to perform tasks based on the specified problem statement. The flowchart above illustrates the application's overall workflow. The UI of the application can also be seen as: 

![image-UI2](./public/UI2.jpeg)
![image-UI1](./public/UI1.jpeg)


## Below, you can find the working details of some of the key `models`:

### Canvas based Gujarati Character Recognition Model

![image-OCR](./public/OCR.jpeg)

The given model takes input from the canvas and run the inference on the model to know about which Gujarati character the given image is. 

### Text to Sign Model 
The given notebook `./text_to_sign.ipynb` shows the experimental working of the Text to Sign model.