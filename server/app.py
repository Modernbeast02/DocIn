from flask import Flask, request, jsonify, json
from flask_cors import CORS,cross_origin
import pandas as pd
import numpy as np
import pickle
from numpy.linalg import norm
from sklearn.neighbors import NearestNeighbors
from io import BytesIO
from PIL import Image
import cv2

import os
import tensorflow as tf
import tensorflow as tf
from tensorflow import keras
import keras_ocr 
from PIL import Image
from pytesseract import pytesseract
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from spellchecker import SpellChecker
spell = SpellChecker()

def isPresent(token):
    digits = "0123456789.-,'()!:;+‘%$#@&^*|"
    present = 0
    for i in range(len(token)):
        if token[i] in digits:
            present = 1
            return True
    return False
 

def final_tokens(token_list):
    res = []
    list = token_list
    for token in list:
        token = str(token)
        if not isPresent(token):
            if spell.correction(token) == token:
                if token.lower() not in res:
                    res.append(token.lower())

    final__tokens = res
    return final__tokens


stop_words = set(stopwords.words('english'))


pipeline = keras_ocr.pipeline.Pipeline()

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


#load model pickel file
with open('../model/model.pickle', 'rb') as f:
    model = pickle.load(f)

with open('../model/features.json') as f:
    featureJson = json.load(f)
feature_names = featureJson['feature_names']
print(feature_names)
#load dataframe
# df = pd.read_csv("../model/data.csv")

#Perprocessing Functions
#model -> [3660] -  1 0 1 0 0 0 -> Class
def preprocessImage(img):
    # keras_ocr.tools.
    # images = [keras_ocr.tools.read(img)]
    # prediction_groups = pipeline.recognize(images)
    # predicted_image_1 = prediction_groups[0]
    # image_text_list = []
    # for text, box in predicted_image_1:
    #     image_text_list.append(text)
    # image_text = " "
    # image_text = image_text.join(image_text_list)

    path_to_tesseract = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    pytesseract.tesseract_cmd = path_to_tesseract
    #Extract text from image
    image_text = pytesseract.image_to_string(img)

    word_tokens = word_tokenize(image_text)
    image_tokens = [w for w in word_tokens if not w.lower() in stop_words]
    final_image_tokens = final_tokens(image_tokens)
    print("finalImageToken")
    print(final_image_tokens)
    rowOfImage = [0]*(len(feature_names))
    for i in range(len(feature_names)):
        if feature_names[i] in final_image_tokens:
            rowOfImage[i] = 1
    print(rowOfImage)
    return rowOfImage


@app.route('/',  methods = ['GET', 'POST'])
def main():
    return "hi"

@app.route('/getClass', methods = ['POST'])
def getClass():
    file = request.files['file']
    # imageLoaded = Image.open(file)
    file.save("sample.png", "")
    imagePreprocessedArray = preprocessImage("sample.png")
    print(imagePreprocessedArray)
    prediction = model.predict([imagePreprocessedArray])
    print(prediction)
    os.remove("sample.png")
    return json.dumps(prediction[0])

    # return "skndvnjsvn"

if __name__=='__main__':  
    app.run(debug=True, port ='5000')