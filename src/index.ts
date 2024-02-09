import { mapNodes } from './declarations';
import { AmazonApp } from './store';
import { utilityGetNode } from './utilities/getNode';

const app = new AmazonApp();
// @ts-ignore
window.app = app;
window.onload = () => {
  utilityGetNode(mapNodes.root).innerHTML = `<h1>${app.name}</h1>`;
};
