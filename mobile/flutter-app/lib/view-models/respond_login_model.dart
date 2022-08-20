import 'dart:core';

class RespondLoginModel{
  String token;
  String refreshToken;
  DateTime expiration;
  List<String>  listClaims;

  RespondLoginModel(this.token, this.refreshToken, this.expiration, this.listClaims);

  factory RespondLoginModel.fromJson(Map<String, dynamic> json) => RespondLoginModel(
    json["token"],
    json["refreshToken"],
    DateTime.parse(json["expiration"]),
    List<String>.from(json["listClaims"].map((x) => x)),
  );

  Map<String, dynamic> toJson() => {
    'token' : token,
    'refreshToken' : refreshToken,
    'expiration' : expiration,
    'listClaims' : listClaims
  };
}