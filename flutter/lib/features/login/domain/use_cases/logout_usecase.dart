

import 'package:dartz/dartz.dart';
import 'package:notification_demo/core/failure/failure.dart';
import 'package:notification_demo/core/usecases/usecase.dart';
import 'package:notification_demo/features/login/data/models/login_success_model.dart';
import 'package:notification_demo/features/login/domain/repositories/login_repository.dart';
import 'package:notification_demo/features/login/domain/use_cases/login_usecase.dart';

class LogOutUsecase implements Usecase<void, Params> {
  final LoginRepository loginRepository;

  LogOutUsecase(this.loginRepository);

  @override
  Future<Either<Failures, void>> call(Params params) async {
    print(' usecase');
    return await loginRepository.logout(params.id);
  }
}

class Params {
  final String id;
  Params(this.id);
}