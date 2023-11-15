const queueUL = document.querySelector(".list-queue");
const queueInput = document.querySelector(".queue-input");
const warningQueue = document.querySelector("#queue-container .warning-top");
const addQueue = document.querySelector(".btn-add-queue");
const dequeue = document.querySelector(".btn-take-dequeue");

const queue = new Queue();

const clearQueueInput = () => {
  queueInput.value = "";
};

const generateListQueue = () => {
  warningQueue.style.display = "none";
  queueUL.innerHTML = ""; // <- this one is very important!
  // it resets the display to be empty, so that new things
  // can be drawn afterwards from scratch ↓↓↓↓.
  let filledBlocks = queue.display().length;
  let emptyBlocks = queue.MAX_SIZE - filledBlocks;
  for (let i = filledBlocks - 1; i >= 0; i--) {
    let li = document.createElement("li");
    li.className = "active";
    li.innerHTML = queue.display()[i];
    queueUL.appendChild(li);
  }
  for (let i = 0; i < emptyBlocks; i++) {
    let li = document.createElement("li");
    li.className = "inactive";
    li.innerHTML = "&nbsp;";
    queueUL.appendChild(li);
  }
};

generateListQueue();

const generateWarningQueue = (type) => {
  warningQueue.style.display = "block";
  warningQueue.innerText = type;
};

const addToQueue = () => {
  try {
    warningQueue.style.display = "none";
    queue.enqueue(queueInput.value);
    clearQueueInput();
    console.log("queue so far:", queue.display());
    generateListQueue();
  } catch (error) {
    generateWarningQueue("overflow");
  }
};

const removeFromQueue = () => {
  try {
    warningQueue.style.display = "none";
    queue.dequeue();
    console.log("queue so far:", queue.display());
    generateListQueue();
  } catch (error) {
    generateWarningQueue("underflow");
  }
};

addQueue.addEventListener("click", addToQueue);
dequeue.addEventListener("click", removeFromQueue);
