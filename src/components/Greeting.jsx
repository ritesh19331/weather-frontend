import React, { useEffect, useState } from "react";

export default function Greeting() {
  const [name, setName] = useState("User");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return <h2>Hi {name}</h2>;
}
