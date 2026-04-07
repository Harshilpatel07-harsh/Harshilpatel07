const reader = new Html5Qrcode("camera");
let scannerOn = false;

const btn = document.getElementById("btn");

function toggleScanner() {
    scannerOn = !scannerOn;

    if (scannerOn) {
        startScanner();
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {},
        function (text) {

            // ✅ Parse QR JSON
            const data = JSON.parse(text);

            // ✅ Show inventory info
            document.getElementById("name").textContent =
                "Name: " + data.name;

            document.getElementById("stock").textContent =
                "In store: " + (data.in_store ? "Yes" : "No");

            document.getElementById("price").textContent =
                "Price: €" + data.price;

            // Stop scanner
            toggleScanner();
        }
    ).catch(function (err) {
        console.error(err);
    });
}

function stopScanner() {
    reader.stop();
}
