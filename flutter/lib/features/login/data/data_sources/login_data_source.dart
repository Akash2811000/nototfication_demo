

import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';
import 'package:notification_demo/core/failure/failure.dart';
import 'package:notification_demo/features/login/data/models/login_success_model.dart';

abstract class LoginDataSource {
  Future<Either<Failures,LoginModel>> login(String email,String password,String deviceid,String fcm);
  Future<Either<Failures,void>> logout(String id);
}

class LoginDataSourceImpl implements LoginDataSource {
  final Dio dio;

  LoginDataSourceImpl(this.dio);

  @override
  Future<Either<Failures,LoginModel>> login(String email, String password,String deviceid, String fcm) async {
    try {
      final response = await dio.post('https://9a2c-180-211-112-179.in.ngrok.io/user/login',data: {"email":email,"password":password,"fcmtoken":fcm,"deviceid":deviceid});
      print(' datasource ${email},${fcm},${deviceid},${password}');
    var result = response.data;
      print("response ${response}");
    if (response.statusCode == 200) {
    LoginModel loginModel=LoginModel.fromJson(response.data);
    return Right(loginModel);
    } else if (response.statusCode == 505) {
    return Left(ServerFailure());
    } else if (response.statusCode == 404) {
    return Left(
    AuthFailure()); //Data Not Found Failure but in failure there is not method so AuthFailure
    } else {
    return Left(InternetFailure());
    }
    } catch (e) {
      print('${e}');
    return Left(ServerFailure());
    }
  }

  @override
  Future<Either<Failures,void>> logout(String id) async {
    try {
      final response = await dio.post('https://25a5-2406-b400-d5-caab-93a-379b-d3e-ba26.in.ngrok.io/user/logout',data: {"id":id,});
      print(' datasource ');
      var result = response.data;
      if (response.statusCode == 200) {
        return Right(null);
      } else if (response.statusCode == 505) {
        return Left(ServerFailure());
      } else if (response.statusCode == 404) {
        return Left(AuthFailure()); //Data Not Found Failure but in failure there is not method so AuthFailure
      } else {
        return Left(InternetFailure());
      }
    } catch (e) {
      return Left(ServerFailure());
    }
  }

}

