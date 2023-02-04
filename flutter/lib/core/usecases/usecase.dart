
import 'package:dartz/dartz.dart';
import 'package:notification_demo/core/failure/failure.dart';


abstract class Usecase<Type, Params> {
  Future<Either<Failures, Type>> call(Params params);
}


class NoParams  {

}
