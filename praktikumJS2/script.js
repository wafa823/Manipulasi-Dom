document.addEventListener("DOMContentLoaded", function () {
    // Menentukan elemen-elemen yang diperlukan
    const list = document.getElementById("list");
    const addItemButton = document.getElementById("addItem");
    const removeItemButton = document.getElementById("removeItem");
    const removeByNumberButton = document.getElementById("removeByNumber");
    const itemNumberInput = document.getElementById("itemNumber");
    const saveNameButton = document.getElementById("SaveName");
    const deleteNameButton = document.getElementById("deleteName");
    const usernameInput = document.getElementById("username");
    const dataContainer = document.getElementById("data");

    // Fungsi untuk menampilkan sapaan
    function displayGreeting() {
        const username = localStorage.getItem("username");
        if (username) {
            document.getElementById("greeting").textContent = `Halo, ${username}! Selamat datang kembali`;
        } else {
            document.getElementById("greeting").textContent = ""; // Kosongkan jika tidak ada username
        }
    }

    // Menampilkan sapaan saat halaman dimuat jika nama tersimpan di localStorage
    displayGreeting();

    // 1. Menambahkan item baru ke dalam list
    addItemButton.addEventListener("click", function() {
        const newItem = document.createElement("li");
        newItem.textContent = `Item ${list.children.length + 1}`;
        list.appendChild(newItem);
    });

    // 2. Menghapus item terakhir dari list
    removeItemButton.addEventListener("click", function() {
        if (list.children.length > 0) {
            list.removeChild(list.lastElementChild);
        }
    });

    // 3. Menghapus item berdasarkan nomor yang dimasukkan pengguna
    removeByNumberButton.addEventListener("click", function() {
        const itemNumber = parseInt(itemNumberInput.value.trim(), 10);

        // Validasi input
        if (isNaN(itemNumber) || itemNumber < 1 || itemNumber > list.children.length) {
            alert("Nomor item tidak valid. Masukkan nomor yang benar.");
            return;
        }

        // Menghapus item berdasarkan nomor (indeks dimulai dari 0)
        const itemToRemove = list.children[itemNumber - 1];
        list.removeChild(itemToRemove);
    });

    // 4. Menyimpan nama ke localStorage dan menampilkan sapaan
    saveNameButton.addEventListener("click", function() {
        const username = usernameInput.value.trim();
        if (username) {
            localStorage.setItem("username", username);
            displayGreeting();
        }
    });

    // 5. Menghapus nama yang tersimpan di localStorage
    deleteNameButton.addEventListener("click", function() {
        localStorage.removeItem("username"); // Hapus nama dari localStorage
        displayGreeting();  // Perbarui tampilan sapaan
    });

    // 6. Menggunakan async/await untuk memuat data
    async function loadDataAsync() {
        // Menunggu hasil dari operasi asinkron
        try {
            const result = await simulateDataLoading();
            dataContainer.textContent = result;
        } catch (error) {
            dataContainer.textContent = error;
        }
    }

    // Fungsi untuk mensimulasikan pemuatan data dengan delay (misalnya, mengambil data dari server)
    function simulateDataLoading() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = true;  // Ganti dengan kondisi nyata (misalnya, hasil permintaan HTTP)
                if (success) {
                    resolve("Data berhasil dimuat dengan async/await!");
                } else {
                    reject("Gagal memuat data.");
                }
            }, 2000);  // Simulasi delay 2 detik
        });
    }

    // 7. Menampilkan data setelah dimuat menggunakan async/await
    document.getElementById("loadData").addEventListener("click", loadDataAsync);
});
