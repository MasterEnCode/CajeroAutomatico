const users = [
  { nombre: "Johan", email: "johan@hotmail.com", pass: "johan123*", saldo: 425 },
  { nombre: "Mali", email: "mali@hotmail.com", pass: "mali123*", saldo: 200 },
  { nombre: "Maui", email: "maui@hotmail.com", pass: "maui123*", saldo: 200 }
];



let actualUser = {};

$(document).ready(function() {
  storage();
  checkUser();
});

storage = () => {
  const userLS = localStorage.getItem('user');
  actualUser = !userLS ? {} : JSON.parse(userLS);
}

checkUser = () => {
  if (actualUser.nombre != undefined) {
    $("#result").text(actualUser.nombre + " Bienvenid@");
    $("#result").css("color", "white");
    $("#Form").hide();
    $("#logOut").show();
    $("#account").show();
    $("#saldo").text(actualUser.saldo);
  } else {
    $("#Form").show();
    $("#logOut").hide();
    $("#account").hide();
  }
}

checkPass = (email, pass) => {
  let re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    users.map((user) => {
      if (user.email == email.toLowerCase() && user.pass == pass) {
        actualUser = user;
      }
    });
    return actualUser;
  }
}


logIn = (e) =>{
  e.preventDefault();
  $("#result").text("");

  let emailaddress = $("#email").val();
  let password = $("#pass").val();
  checkPass(emailaddress, password);
  localStorage.setItem('user', JSON.stringify(actualUser));
  if (actualUser.nombre != undefined) {
    checkUser()
  } else {
    $("#msj").text("Usuario o contraseña incorrectos");
    $("#msj").css("color", "red");
  }
  return false;
}

clear = () => {
  $("#ingresarMonto").val("");
  $("#retirarMonto").val("");
  return false;
}

mostrarSaldo = () => {
  $("#saldo").css("color", "green");
  $("#saldo").fadeTo(100, 0.1).fadeTo(500, 1.0);
  $("#saldo").css("color", "white");
  return false;
}

consultarSaldo = (saldo) => {
  actualUser.saldo = saldo;
  $("#saldo").text(actualUser.saldo);
  $("#saldo").css("color", "green");
  $("#saldo").fadeTo(100, 0.1).fadeTo(500, 1.0);
  $("#saldo").css("color", "white");
  $("#transaction").text("");
  return false;
}

ingresarMonto = () => {
  let monto = parseInt($("#ingresarMonto").val());
  if (!monto) {
    $("#transaction").text("Debe ingresar un monto y que sea superior a 0");
    $("#transaction").css("color", "red");
  }else{
    users.map((user) => {
      if (user.nombre == actualUser.nombre) {
        let saldo = user.saldo + monto;
        if (saldo <= 990) {
          user.saldo += monto;
          consultarSaldo(user.saldo);
        }else{
          $("#transaction").text("Saldo maximo alcanzado");
          $("#transaction").css("color", "red");
        }
      } else {
        $("#transaction").text("Usuario no pertenece a esta cuenta");
        $("#transaction").css("color", "red");
      }
    });
  }
  clear();
  return actualUser;
}

retirarMonto = () =>{
  let monto = parseInt($("#retirarMonto").val());
  if (!monto) {
    $("#transaction").text("Debe ingresar un monto y que sea superior a 0");
    $("#transaction").css("color", "red");
  }else{
  users.map((user) => {
    if (user.nombre == actualUser.nombre && user.saldo >= monto) {
      let saldo = user.saldo - monto;
      if (saldo >= 10) {
        user.saldo -= monto;
        consultarSaldo(user.saldo);
      } else {
        $("#transaction").text("Debes tener al menos 10 pesos");
        $("#transaction").css("color", "red");
      }
    } else {
      $("#transaction").text("Monto Excedido a retirar");
      $("#transaction").css("color", "red");
    }
  });
 }
  clear();
  return actualUser;
}

logOut  = () => {
  localStorage.clear();
  storage();
  checkUser()
}

$("#login").bind("click", logIn);
$("#logOut").bind("click", logOut);

$("#consultarMontoBtn").bind("click", mostrarSaldo);
$("#ingresarMontoBtn").bind("click", ingresarMonto);
$("#retirarMontoBtn").bind("click", retirarMonto);



