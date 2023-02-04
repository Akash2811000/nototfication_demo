import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:notification_demo/features/login/data/data_sources/login_data_source.dart';
import 'package:notification_demo/features/login/data/repositories/login_repository_impl.dart';
import 'package:notification_demo/features/login/domain/repositories/login_repository.dart';
import 'package:notification_demo/features/login/domain/use_cases/login_usecase.dart';
import 'package:notification_demo/features/login/presentation/cubit/login_cubit.dart';

var loginSl = GetIt.instance;

Future<void> init() async {
  //cubit
  loginSl.registerFactory(() => LoginCubit(loginSl()));

  //DataSource
  loginSl.registerLazySingleton<LoginRepository>(() => LoginRepositoryImpl( loginDataSource: loginSl()));

  //Repository
  loginSl.registerLazySingleton<LoginDataSource>(() => LoginDataSourceImpl(loginSl()));

  //usecase
  loginSl.registerLazySingleton(() => LoginUsecase(loginSl()));

  loginSl.registerFactory(() => Dio());
}