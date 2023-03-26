/** @format */

import React from "react";
import { useParams } from "react-router-dom";

const Build = () => {
	const { bID } = useParams();
	return <div>Build / {bID}</div>;
};

export default Build;
