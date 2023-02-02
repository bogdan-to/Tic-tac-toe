
    // igrac X je 1, igrac O je 2
    // pocetni igrac je X
    var counter = 0;
    document.getElementById("ko_je_na_potezu").innerHTML = ("Igrac " + 1)

    // pobeda je ako je tri ista karaktera u nizu
    var pobeda = 3;

    // pocetno stanje matrice
    var stanje = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    // koordinate dugmica i funkcija koja vraca red i kolonu stisnutog dugmeta
    var buttons = {
        btn_1: [0, 0],
        btn_2: [0, 1],
        btn_3: [0, 2],
        btn_4: [1, 0],
        btn_5: [1, 1],
        btn_6: [1, 2],
        btn_7: [2, 0],
        btn_8: [2, 1],
        btn_9: [2, 2],
        pozicija: function (x) {
            var poz_red = this["btn_" + x][0];
            var poz_kol = this["btn_" + x][1];
            return poz = [poz_red, poz_kol];
        }
    }

    var game_over = false;

    // stavlja vrednost X ili O u dugme
    function place_char(element_id, znak) {
        document.getElementById(element_id).value = znak;
    }

    // provera levo-desno
    // matrix = matrica koja se proverava
    // row, col = red i kolona clana matrice od koga pocinje provera
    // comp = komparator, koja vrednost se proverava u matrici
    function test_ld(matrix, row, col, comp) {
        var cnt = 1;
        for (var i = 1; (col - i) >= 0; i++) {
            if (matrix[row][col - i] == comp) {
                cnt++;
            } else {
                break;
            }
        }
        for (var i = 1; (col + i) < matrix[0].length; i++) {
            if (matrix[row][col + i] == comp) {
                cnt++;
            } else {
                break;
            }
        }
        return cnt;
    }

    // provera gore-dole
    // matrix = matrica koja se proverava
    // row, col = red i kolona clana matrice od koga pocinje provera
    // comp = komparator, koja vrednost se proverava u matrici
    function test_gd(matrix, row, col, comp) {
        var cnt = 1;
        for (var i = 1; (row - i) >= 0; i++) {
            if (matrix[row - i][col] == comp) {
                cnt++;
            } else {
                break;
            }
        }
        for (var i = 1; (row + i) < matrix.length; i++) {
            if (matrix[row + i][col] == comp) {
                cnt++;
            } else {
                break;
            }
        }
        return cnt;
    }

    // provera leve dijagonale
    // matrix = matrica koja se proverava
    // row, col = red i kolona clana matrice od koga pocinje provera
    // comp = komparator, koja vrednost se proverava u matrici
    function test_d1(matrix, row, col, comp) {
        var cnt = 1;
        for (var i = 1; ((row - i) >= 0) && ((col - i) >= 0); i++) {
            if (matrix[row - i][col - i] == comp) {
                cnt++;
            } else {
                break;
            }
        }
        for (var i = 1; ((row + i) < matrix.length) && ((col + i) < matrix[0].length); i++) {
            if (matrix[row + i][col + i] == comp) {
                cnt++;
            } else {
                break;
            }
        }
        return cnt;
    }

    // provera desne  dijagonale
    // matrix = matrica koja se proverava
    // row, col = red i kolona clana matrice od koga pocinje provera
    // comp = komparator, koja vrednost se proverava u matrici
    function test_d2(matrix, row, col, comp) {
        var cnt = 1;
        for (var i = 1; ((row + i) < matrix.length) && ((col - i) >= 0); i++) {
            if (matrix[row + i][col - i] == comp) {
                cnt++;
            } else {
                break;
            }
        }
        for (var i = 1; ((row - i) >= 0) && ((col + i) < matrix[0].length); i++) {
            if (matrix[row - i][col + i] == comp) {
                cnt++;
            } else {
                break;
            }
        }
        return cnt;
    }

    // da li je tabla puna
    function punaTabla() {
        var puna = true;
        for (let i = 0; i < stanje.length; i++) {
            for (let j = 0; j < stanje[0].length; j++) {
                if (stanje[i][j] == 0) {
                    puna = false;
                }
            }
        }
        return puna;
    }

    // funkcija koja se izvrsava kada je stisnuto dugme
    function klik(polje, id, vrednost) {
        // console.log(polje + " " + id + " " + vrednost);
        if (vrednost == " " && !game_over) {
            counter++;
            (counter % 2 != 0) ? igrac = 1 : igrac = 2;
            var znak;
            (igrac == 1) ? znak = "X" : znak = "O";
            poz_red = buttons.pozicija(polje)[0];
            poz_kol = buttons.pozicija(polje)[1];
            stanje[poz_red][poz_kol] = igrac;
            place_char(id, znak);
            var tekstIgrac
            (igrac == 1 && !game_over) ? tekstIgrac = 2 : tekstIgrac = 1;
            document.getElementById("ko_je_na_potezu").innerHTML = ("Igrac " + (tekstIgrac))
            // provera pobede
            var provera_ld = test_ld(stanje, poz_red, poz_kol, igrac);
            var provera_gd = test_gd(stanje, poz_red, poz_kol, igrac);
            var provera_d1 = test_d1(stanje, poz_red, poz_kol, igrac);
            var provera_d2 = test_d2(stanje, poz_red, poz_kol, igrac);
            if (punaTabla()) {
                alert("Nereseno")
                document.getElementById("ko_je_na_potezu").innerHTML = ("Nereseno")
                game_over = true;
            }
            else if (provera_ld == pobeda || provera_gd == pobeda || provera_d1 == pobeda || provera_d2 == pobeda) {
                alert("Pobedio je " + znak + " !!!!!");
                document.getElementById("ko_je_na_potezu").innerHTML = ("Pobedio je " + znak + " !!!!!")
                game_over = true;
            }
        }
    }

    // reset funkcija
    // klikom na reset dugme, svi dugmici se brisu i matrica stanje dobija vrednosti 0
    function reset() {
        for (var i = 1; i <= 9; i++) {
            button_id = "button_" + i;
            document.getElementById(button_id).value = " ";
        }

        for (var i = 0; i < stanje.length; i++) {
            for (var j = 0; j < stanje[0].length; j++) {
                stanje[i][j] = 0;
            }
        }
        document.getElementById("ko_je_na_potezu").innerHTML = ("Igrac" + 1)
        counter = 0;
        game_over = false;
    }

