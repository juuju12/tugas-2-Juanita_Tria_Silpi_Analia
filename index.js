// panggil fungsi readline 
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');


// buat object kosong untuk menampung inputan 
let objectKontak = {
    nama : '',
    nomorHp : ''
}


function viewMenu() { //fungsi untuk menampilkan halaman menu
    console.log("Selamat Datang Di Aplikasi Kontak !");
    console.log("====================================\n");
    console.log("Main Menu :\n");
    console.log("1.Tambah Data \n");
    console.log("2.Lihat Data \n");
    console.log("3.Hapus Data \n");
    console.log("4.Pencarian Data \n");
    console.log("5.Hapus data \n");
    console.log("99.Exit\n");
    readline.question(`Silahkan Masukan Pilihan Anda  :`, input => {
        mainMenu(Number(input))
    });
}



function mainMenu(pilihan) { // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            simpan()
            break;
        case 2:
            lihatData() 
            break;
        // lanjutkan menu pilihanya disini secara urut
        case 3:
            resetData()
            break;
        case 4:
            pencarianData()
            break;
        case 5:
            hapusData()
            break;
        case 99:
            console.log("----SELESAI-----");
            readline.close();
            break;
        default:
            console.log("Pilihan Tidak Valid !");
            readline.close()
            break;
    }
}



function simpan() { // fungsi untuk menyimpan data
    console.log("Silahkan Masukan Data ! : ");
    readline.question("Nama :", (nama) => {
        const regex = /^[a-zA-Z]+$/;
        if (regex.test(nama)) {
            objectKontak.nama = nama
            console.log(`Input data berhasil ! :${nama}`);
            ambilInputanNomor()
          } else {
            console.log("Error!! Input hanya berupa huruf, silahkan kembali masukan nama.");
            simpan()
            
          }
    }) 
}
const ambilInputanNomor = () => { // fungsi untuk mengambil inputan nomor
    readline.question("Nomor :", (nomor) => {
        const regex= /^[0-9]+$/;
        if(nomor==objectKontak.nomorHp){
            console.log("Error!! Nomor hp sudah terdaftar.")
            ambilInputanNomor()
        }else if (regex.test(nomor)) {
            objectKontak.nomorHp = nomor
            databaseKontak.push(Object.assign({},objectKontak)) // insert data kedalam array databseKOntak
            console.log("Data berhasil disimpan.")
            kembali()
          } else {
            console.log("Error!! Input bukan number, silahkan kembali masukan nomor hp");
            ambilInputanNomor()
          }
        
    })
}
const kembali = () => { // fungsi untuk navigasi kembali
    readline.question("Apakah Anda Ingin Kembali ? (y/n) :", (pilihan) => {
        if(pilihan === "y"){
            viewMenu()
        }else {
            readline.close()
        }
        
    })
}

function lihatData () { // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali()
}

function resetData () {
    // tambahkan fungsi reset  data disini
    databaseKontak.length = 0;
    kembali()
}

function pencarianData () {
    // tambahkan fungsi pencarian data disini 
    readline.question("Masukkan kata kunci nama: ", (kataKunci) => {
        const hasilPencarian = cariNama(kataKunci);
        if (hasilPencarian.length > 0) {
            console.log(`Hasil pencarian untuk "${kataKunci}":`);
            hasilPencarian.forEach((hasilNama) => {
                console.table(hasilNama);
            });
        } else {
            console.log(`Tidak ada hasil untuk "${kataKunci}".`);
        }
        kembali();
    });
    
}
function cariNama(keyword) {
    const hasilPencarian = databaseKontak.filter((kontak) =>
        kontak.nama.toLowerCase().includes(keyword.toLowerCase())
    );

    return hasilPencarian;
}
function hapusData () {
    // tambahkan fungsi hapus data data disini 
    console.log("Data yang tersedia:");
    console.table(databaseKontak);
    readline.question("Masukkan indeks data yang ingin dihapus: ", (indeks) => {
        indeks = parseInt(indeks);

        if (isNaN(indeks) || indeks < 0 || indeks >= databaseKontak.length) {
            console.log("Indeks tidak valid.");
            hapusData();
            return;
        }

        const namaYangDihapus = databaseKontak[indeks].nama;
        databaseKontak.splice(indeks, 1); // Hapus data berdasarkan indeks

        console.log(`Data ${namaYangDihapus} telah dihapus.`);
        kembali();
    });
    
}


viewMenu() // panggil fungsi view menu untuk pertama kali
