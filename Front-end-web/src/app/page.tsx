"use client";

import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function Page(): JSX.Element {
    const [input, setInput] = useState("");

    return (
        <div>
            <h1>Page</h1>
        </div>
    );
}
