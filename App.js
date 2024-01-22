import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {Game} from "./tic-tac-toe"
import {Products} from "./products"

export default  function App(){
    return(
        <>
            <Game />
            <Products />
        </>
    )
}

