

import 'package:dartz/dartz.dart';
import 'package:notification_demo/core/failure/failure.dart';
import 'package:notification_demo/core/usecases/usecase.dart';
import 'package:notification_demo/features/login/data/models/login_success_model.dart';
import 'package:notification_demo/features/login/domain/repositories/login_repository.dart';

class LoginUsecase implements Usecase<LoginModel, Params> {
  final LoginRepository loginRepository;

  LoginUsecase(this.loginRepository);

  @override
  Future<Either<Failures, LoginModel>> call(Params params) async {
    print(' usecase ${params.email}');
    return await loginRepository.login(params.email,params.password,params.fcm,params.deviceid);
  }
}

class Params {
  final String email;
  final String password;
  final String fcm;
  final String deviceid;
  Params(this.email,this.password,this.fcm,this.deviceid);
}