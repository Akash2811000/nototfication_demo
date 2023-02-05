
import 'package:dartz/dartz.dart';
import 'package:notification_demo/core/failure/failure.dart';
import 'package:notification_demo/features/login/data/models/login_success_model.dart';

abstract class LoginRepository {
  Future<Either<Failures, LoginModel>> login(String email,String password,String deviceid,String fcm);
  Future<Either<Failures, void>> logout(String id);
}