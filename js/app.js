const users = [
  { nombre: "Johan", email: "johan225@hotmail.es", pass: "123", saldo: 100 },
];

let actualUser = {};

function checkPass(email, pass) {
  let re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email)) {
    users.map((user) => {
      if (user.email == email && user.pass == pass) {
        actualUser = user;
      } else {
        actualUser = {};
      }
    });
    return actualUser;
  }
}

function logIn(e) {
  e.preventDefault();
  $("#result").text("");

  let emailaddress = $("#email").val();
  let password = $("#pass").val();
  checkPass(emailaddress, password);

  if (actualUser.nombre != undefined) {
    $("#result").text(actualUser.nombre + " Bienvenid@");
    $("#result").css("color", "white");
    $("#Form").hide();
    $("#account").show();
    $("#saldo").text(actualUser.saldo);
  } else {
    $("#msj").text("Usuario o contraseña incorrectos");
    $("#msj").css("color", "red");
  }
  return false;
}
$("#login").bind("click", logIn);

function clear() {
  $("#ingresarMonto").val("");
  $("#retirarMonto").val("");
  return false;
}

function mostrarSaldo() {
  $("#saldo").css("color", "green");
  $("#saldo").fadeTo(100, 0.1).fadeTo(500, 1.0);
  $("#saldo").css("color", "white");
  return false;
}

function consultarSaldo(saldo) {
  actualUser.saldo = saldo;
  $("#saldo").text(actualUser.saldo);
  $("#saldo").css("color", "green");
  $("#saldo").fadeTo(100, 0.1).fadeTo(500, 1.0);
  $("#saldo").css("color", "white");
  $("#transaction").text("");
  return false;
}

function ingresarMonto() {
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

function retirarMonto() {
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

$("#consultarMontoBtn").bind("click", mostrarSaldo);
$("#ingresarMontoBtn").bind("click", ingresarMonto);
$("#retirarMontoBtn").bind("click", retirarMonto);
