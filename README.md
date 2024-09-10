# Gujarati-Sign-Language

## Samvaad (Team: entropy)

![image-20240909095150960](./public/chart.png)

**Samvaad** is a React Native-based application that integrates with various microservices to perform tasks based on the specified problem statement. The flowchart above illustrates the application's overall workflow. The UI of the application can also be seen as:

<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="./public/UI1.jpeg" alt="UI1" width="45%">
    <img src="./public/UI2.jpeg" alt="UI2" width="45%">
</div>

## Below, you can find the working details of some of the key `models`:

### Canvas based Gujarati Character Recognition Model

![image-OCR](./public/OCR.jpeg)

The given model takes input from the canvas and runs the inference on the model to know about which Gujarati character the given image is.

### Text to Sign Model 

The below output shows the speech to ISL sign conversion using Gujarati speech as input and rendering the model:

<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="./public/input.png" alt="Input" width="45%">
    <img src="./public/model.gif" alt="Model" width="45%">
</div>

As the input for particular Gujarati speech is received, it's then transcribed to Gujarati and then converted to English text to be further rendered by the model.

