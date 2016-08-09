import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as constants from '../../constants/WorldMap'
import * as worldMapActions from '../../actions/worldMapActions'

export default class WorldMap extends Component {
    constructor(props) {
        super(props)
    }

    handleResize = () => {
        const width = document.body.clientWidth - constants.RIGHT_OFFSET
        const height = window.innerHeight
        this.props.worldMapActions.resize(width, height)
        init(this.props)
    }

    componentDidMount() {
        init(this.props)
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    render() {
        return (
            <canvas id='tw-world-map' width='100%' height='100%' >
                <div>You have no canvas, do sasai, please.</div>
            </canvas>
        )
    }
}

let int

function init(props) {
    const canvas = document.getElementById(constants.CANVAS_ID)
    const ctx = canvas.getContext(constants.CONTEXT_2D);
    var img = new Image();

    canvas.width = props.worldMap.dimensions.width;
    canvas.height = props.worldMap.dimensions.height;

    // User Variables - customize these to change the image being scrolled, its
    // direction, and the speed.

    img.src = 'https://upload.wikimedia.org/wikipedia/en/7/72/World_Map_WSF.svg.png';
    var CanvasXSize = canvas.width;
    var CanvasYSize = canvas.height;
    var speed = 30; //lower is faster
    var scale = 1.05;
    var y = -4.5; //vertical offset

    // Main program

    var dx = 0.75;
    var imgW;
    var imgH;
    var x = 0;
    var clearX;
    var clearY;

    if (int) {
        clearInterval(int);
    }

    if (img.complete) {
        imgW = img.width*scale;
        imgH = img.height*scale;
        if (imgW > CanvasXSize) { x = CanvasXSize-imgW; } // image larger than canvas
        if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
        else { clearX = CanvasXSize; }
        if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
        else { clearY = CanvasYSize; }
        //Set Refresh Rate
        return int = setInterval(draw, speed);
    } else {
        img.onload = function() {
            imgW = img.width*scale;
            imgH = img.height*scale;
            if (imgW > CanvasXSize) { x = CanvasXSize-imgW; } // image larger than canvas
            if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
            else { clearX = CanvasXSize; }
            if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
            else { clearY = CanvasYSize; }
            //Set Refresh Rate
            return int = setInterval(draw, speed);
        }
    }

    function draw() {
        //Clear Canvas
        ctx.clearRect(0,0,clearX,clearY);
        //If image is <= Canvas Size
        if (imgW <= CanvasXSize) {
            //reset, start from beginning
            if (x > (CanvasXSize)) { x = 0; }
            //draw aditional image
            if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-CanvasXSize+1,y,imgW,imgH); }
        }
        //If image is > Canvas Size
        else {
            //reset, start from beginning
            if (x > (CanvasXSize)) { x = CanvasXSize-imgW; }
            //draw aditional image
            if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-imgW+1,y,imgW,imgH); }
        }
        //draw image
        ctx.drawImage(img,x,y,imgW,imgH);
        //amount to move
        x += dx;
    }

}

function mapStateToProps(state) {
    return {
        worldMap: state.worldMap
    }
}


// Связываем экшны с диспатчером, та еще херь но если этого не сделать здесь - прийдется каждый раз при вызове экшна указывать dispatch
// Нахера связать экшны с диспатчером? Чтоб редакс увидел вызов этого экшна
function mapDispatchToProps(dispatch) {
    return {
        worldMapActions: bindActionCreators(worldMapActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorldMap)
