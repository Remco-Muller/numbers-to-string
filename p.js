let str = ""
let check = false;
let small = [["zero ","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],
    ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
    [" hundred ", " thousand", " million", " billion", " trillion"]]
function sayNumber(num) {
    if(num == 0){return small[num][num].charAt(0).toUpperCase() + small[num][num].slice(1).replace(/\s?$/,'.')}
    let arr = []
    let strArray = [...String(num)].reverse()
    for(let w = 0; w < strArray.length; w+= 3){
        arr.push(strArray.slice(w,w+3))
    }
    arr = arr.map((a)=> a.reverse()).reverse()
    str = arr.map((a,c)=> a.map((b, index)=> test([...String(num)], a,c, b, index) ))
    str = str.join().replace(/,/g,"").replace(/ +(?= )/g, "").replace(/=/g, ",").replace("and ten", "ten").replace("twelve million,", "twelve million")
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/\s?$/,'.')
}

function test(full, a, c, n, i){
    let str = ""
    if(n == 0 && check == false){return ""}
    if(a.length == 3){
        if(i == 0){
            str+= small[i][n] + " " + small[a.length - 1][i]
        }else if(i == 1){
            if(n == 1){
                check = true
                return ""
            }else{
                if(a[i - 1] == 0){
                    str+= small[i][n - 2]
                }else{
                    str+= " and " + small[i][n - 2]
                }

            }
        }else{
            if(check != true){
                if(a[i - 1] == 0){
                    str+= " and " + small[0][n] + " "
                }else{
                    str+= "-" + small[0][n] + " "
                }

            }else{
                check = false;
                str+= " and " + small[0][parseInt(n) + 10] + " "
            }

        }
    }else if(a.length == 2){
        if(i == 0){
            if(n == 1){
                check = true
                return ""
            }else{
                str+= small[a.length - 1][n - 2]
            }
        }else{
            if(check != true){
                str+= "-" + small[0][n]
            }else{
                check = false;
                str+= small[0][parseInt(n) + 10]
            }
        }

    }else{
        str+= small[0][n]
    }
    str += validate(full, a, c, n, i)
    return str
}

function validate(full, a, c, n, i){
    if(((a.length - 1) == i) || (a.length == 2 && a[1] == 0) || (a.length == 3 && a[1] == 0 && a[2] == 0) || (a.length == 3 && i == 1 && a[2] == 0)){
        if(Math.ceil(full.length / 3) > 1 && Math.ceil((full.length / 3) - 1) != c){
            return small[2][(Math.ceil(full.length / 3) - c - 1)] + ((Math.ceil((full.length / 3)) - 2) == c ? (full[full.length - 3] == 0 ? " ":"= "):"= ")
        }else{
            return ""
        }
    }else{
        return ""
    }
}