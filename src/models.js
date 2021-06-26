import React , { useState,useEffect } from 'react'
import { MODEL_URL } from './config';
import * as tf from '@tensorflow/tfjs'

const Models = (props) => {
    const [model, setModel] = useState();
        useEffect(()=>{
        tf.ready().then(()=>{
        loadModel(MODEL_URL)
        });
        },[])
    async function loadModel(url) {
        try {
        // For layered model
        // const model = await tf.loadLayersModel(url.model);
        // For graph model
        const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json');
        setModel(model);
        console.log("Load model success",model)
        }
        catch (err) {
        console.log(err);
        }
        }
        //React Hook
        
    return (
        <div>
            
        </div>
    )
}

export default Models
