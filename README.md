Kenapa struktur folder ini harus ditekankan?

Stuktur folder kayak gini merupakan standar developer yang banyak sekali digunakan dan sering ditemukan. Jadi sebaiknya dibiasakan untuk pengerjaan project, baik personal project atau team, untuk menggunakan struktur folder seperti ini.

Kenapa dipisah Frontend sama Backend nya?

Salah satu aturan REST API yang baik adalah untuk tidak melakukan render view sekalipun atau memiliki ketergantungan pada client. REST API hanya peduli terhadap request yang masuk dan data yang akan dikirim. Itu saja.

Makanya itulah aku pisahkan foldernya, bagi yang udah pernah develop menggunakan frontend framework, contohnya React/Vue/Angular, ini hal yang biasa kok, kita tetap menjalankan server client di port yang berbeda, biasanya :3000, dan server juga di port berbeda, biasanya :5000.

Kelak nanti kalau kita kerja secara tim pada perusahaan, terutama yang bagi-bagi tugas frontend & backendnya, dijamin 1000% bakal ketemu sama yang kayak ginian.
