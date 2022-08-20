import 'dart:convert';
import 'package:http/http.dart';
import '../view-models/request_login_model.dart';
import '../view-models/respond_login_model.dart';

class HttpService {
  final String baseUrl = 'localhost:7056/api';
  Client client = Client();

  Future<RespondLoginModel> login(RequestLoginModel model) async {
    var url = Uri.https(baseUrl, '/user/authenticate');
    final response = await client.post(
      url,
      headers: {"content-type": "application/json"},
      body: LoginToJson(model),
    );

    print('Response body: ${response.body}');

    return RespondLoginModel.fromJson(json.decode(response.body));
  }
}
