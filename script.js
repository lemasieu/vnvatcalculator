window.onload = function () {
    const input1 = document.getElementById("input1");
    const selected2 = document.getElementById("selected2");
    const selected3 = document.getElementById("selected3");
    const output1 = document.getElementById("output1");
    const output2 = document.getElementById("output2");
    const output3 = document.getElementById("output3");

    // Tự động thêm dấu chấm khi nhập
    input1.addEventListener('input', function () {
        let value = this.value.replace(/\./g, ''); // Loại bỏ dấu chấm
        if (!isNaN(value) && value !== "") {
            this.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu chấm
        } else {
            this.value = '';
        }
    });

    // Sự kiện tính toán VAT
    input1.addEventListener('input', calculateVAT);
    selected2.addEventListener('change', calculateVAT);
    selected3.addEventListener('change', calculateVAT);

    function calculateVAT() {
        // Loại bỏ dấu chấm trong input1 để lấy giá trị thô
        const rawInput1 = parseFloat(input1.value.replace(/\./g, '')) || 0;
        const vatRate = parseFloat(selected2.value); // Tỷ lệ thuế VAT
        const vatType = selected3.value; // Loại VAT: đã/chưa bao gồm

        let priceBeforeVAT = 0, vatAmount = 0, priceAfterVAT = 0;

        if (vatType === 'chua') {
            // Chưa bao gồm VAT
            priceBeforeVAT = rawInput1;
            vatAmount = Math.round(priceBeforeVAT * vatRate);
            priceAfterVAT = priceBeforeVAT + vatAmount;
        } else if (vatType === 'da') {
            // Đã bao gồm VAT
            priceAfterVAT = rawInput1;
            vatAmount = Math.round(priceAfterVAT * vatRate / (1 + vatRate));
            priceBeforeVAT = priceAfterVAT - vatAmount;
        }

        // Hiển thị kết quả với dấu chấm
        output1.textContent = priceBeforeVAT.toLocaleString('vi-VN').replace(/,/g, ".");
        output2.textContent = vatAmount.toLocaleString('vi-VN').replace(/,/g, ".");
        output3.textContent = priceAfterVAT.toLocaleString('vi-VN').replace(/,/g, ".");
    }
    
    // Tính năng tự động sao chép
    [output1, output2, output3].forEach(output => {
        output.addEventListener('click', function () {
            // Tạo một element tạm để sao chép
            const tempInput = document.createElement('input');
            tempInput.value = this.textContent;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy'); // Sao chép giá trị
            document.body.removeChild(tempInput);

            // Hiển thị thông báo "Đã sao chép!"
            const tooltip = document.createElement('div');
            tooltip.textContent = "Đã sao chép!";
            tooltip.style.position = "absolute";
            tooltip.style.backgroundColor = "#4CAF50";
            tooltip.style.color = "#fff";
            tooltip.style.padding = "5px 10px";
            tooltip.style.borderRadius = "5px";
            tooltip.style.top = `${this.offsetTop - 30}px`;
            tooltip.style.left = `${this.offsetLeft}px`;
            tooltip.style.zIndex = 1000;
            document.body.appendChild(tooltip);

            // Xóa thông báo sau 1 giây
            setTimeout(() => {
                document.body.removeChild(tooltip);
            }, 1000);
        });
    });
};
