import React from 'react'
import './FaceRecognition.css'


const FaceRecognition = ({image, box}) => {
    return(

        <div className='center'>
            <div className='absolute mt2'>
            { image ? <img id="inputimage" alt="face detection result" width="500px" height="auto" src={image.toString()}/> : null}
            { box.map((item, index) => <div key={index} className='bounding-box' style={{top: box[index].topRow, right: box[index].rightCol, bottom: box[index].bottomRow, left: box[index].leftCol, position:'absolute'}}/> )}
            </div>
        </div>
    );
};

export default FaceRecognition;