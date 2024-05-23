document.addEventListener('DOMContentLoaded', () => {
    const initialPartition = document.getElementById('initial-partition');
    
    initialPartition.style.backgroundColor = getRandomColor();
    setupButtons(initialPartition);

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function setupButtons(partition) {
        const buttonGroup = partition.querySelector('.button-group');
        const splitVerticalButton = buttonGroup.querySelector('.split-vertical');
        const splitHorizontalButton = buttonGroup.querySelector('.split-horizontal');

        splitVerticalButton.addEventListener('click', (e) => {
            e.stopPropagation();
            splitPartition(partition, 'vertical');
        });

        splitHorizontalButton.addEventListener('click', (e) => {
            e.stopPropagation();
            splitPartition(partition, 'horizontal');
        });
    }

    function splitPartition(partition, direction) {
        const parent = partition.parentElement;
        const parentColor = partition.style.backgroundColor;

        const newPartition = document.createElement('div');
        newPartition.classList.add('partition');
        newPartition.style.backgroundColor = getRandomColor();

        if (direction === 'vertical') {
            partition.style.width = '50%';
            partition.style.height = '100%';
            newPartition.style.width = '50%';
            newPartition.style.height = '100%';
            newPartition.style.left = '50%';
            newPartition.style.top = '0';
        } else if (direction === 'horizontal') {
            partition.style.width = '100%';
            partition.style.height = '50%';
            newPartition.style.width = '100%';
            newPartition.style.height = '50%';
            newPartition.style.left = '0';
            newPartition.style.top = '50%';
        }

        partition.style.position = 'absolute';
        newPartition.style.position = 'absolute';

        parent.appendChild(newPartition);

        addButtonGroup(partition);
        addButtonGroup(newPartition);
    }

    function addButtonGroup(partition) {
        let buttonGroup = partition.querySelector('.button-group');
        if (buttonGroup) {
            partition.removeChild(buttonGroup);
        }

        buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');

        const splitVerticalButton = document.createElement('button');
        splitVerticalButton.classList.add('split-vertical');
        splitVerticalButton.textContent = 'V';

        const splitHorizontalButton = document.createElement('button');
        splitHorizontalButton.classList.add('split-horizontal');
        splitHorizontalButton.textContent = 'H';

        buttonGroup.appendChild(splitVerticalButton);
        buttonGroup.appendChild(splitHorizontalButton);
        partition.appendChild(buttonGroup);

        setupButtons(partition);
    }
});
