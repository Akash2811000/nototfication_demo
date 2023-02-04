import 'package:dartz/dartz.dart';
import 'package:notification_demo/core/failure/failure.dart';
import 'package:notification_demo/features/login/data/data_sources/login_data_source.dart';
import 'package:notification_demo/features/login/data/models/login_success_model.dart';
import 'package:notification_demo/features/login/domain/repositories/login_repository.dart';


class LoginRepositoryImpl implements LoginRepository {
  final LoginDataSource loginDataSource;

  LoginRepositoryImpl({required this.loginDataSource});

  @override
  Future<Either<Failures, LoginModel>> login(String email,String password,String deviceid,String fcm) async {
    print(' repo ${email}');
    return await loginDataSource.login(email,password,fcm,deviceid);
  }
}