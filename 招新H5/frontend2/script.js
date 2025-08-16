// 获取所有可拖动元素和放置区域元素
const dragBoxes = document.querySelectorAll('.drag-box');
const dropBoxes = document.querySelectorAll('.drop-box');

// 为每个可拖动元素添加拖拽相关事件监听
dragBoxes.forEach(dragBox => {
  dragBox.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', dragBox.dataset.value);
    dragBox.classList.add('dragging');
  });

  dragBox.addEventListener('dragend', () => {
    dragBox.classList.remove('dragging');
  });
});

// 为每个放置区域元素添加拖拽相关事件监听
dropBoxes.forEach(dropBox => {
  dropBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropBox.classList.add('drag-over');
  });

  dropBox.addEventListener('dragleave', () => {
    dropBox.classList.remove('drag-over');
  });

  dropBox.addEventListener('drop', (e) => {
    e.preventDefault();
    const targetValue = e.dataTransfer.getData('text/plain');
    const dragBox = document.querySelector(`.drag-box[data-value="${targetValue}"]`);
    if (dropBox.dataset.target === targetValue) {
      // 将可拖动方块放入放置区域
      dropBox.querySelector('.inner-box').replaceWith(dragBox.cloneNode(true));
      // 可根据需求决定是否隐藏原可拖动方块，这里简单移除演示
      dragBox.remove();
    }
    dropBox.classList.remove('drag-over');
  });
});