'use client'

import { useState, } from "react";

function Atestacion() {
    const [name, setName] = useState("");
    return (
        <div className="fles flex-col items-cemter">
            <input
            type="text"
            placeholder="Enter institution..."
            className="w-72 p-2 mt-12 text-black rounded-md"
            
            />



        </div>

    )
}