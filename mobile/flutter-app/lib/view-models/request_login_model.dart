import 'dart:convert';

class RequestLoginModel{

  String username;
  String password;
  RequestLoginModel(this.username, this.password);

  factory RequestLoginModel.fromJson(Map<String, dynamic> json) => RequestLoginModel(
    json["username"],
    json["password"],
  );

  Map<String, dynamic> toJson() {
    return {"username": username, "password": password};
  }
}

String LoginToJson(RequestLoginModel data) {
  final jsonData = data.toJson();
  return json.encode(jsonData);
}
