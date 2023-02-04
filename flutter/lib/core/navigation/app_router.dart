import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:notification_demo/core/navigation/router_info.dart';
import 'package:notification_demo/features/login/login_injection.dart';
import 'package:notification_demo/features/login/presentation/cubit/login_cubit.dart';
import 'package:notification_demo/features/login/presentation/pages/login.dart';

class Router {
  static Route<dynamic> generateRoutes(RouteSettings settings) {
    switch (settings.name) {
      case RoutesName.Login:
        return MaterialPageRoute(builder: (_) {
          return BlocProvider(
            create: (context) => loginSl<LoginCubit>(),
            child: Login(),
          );
        });
      default:
        return MaterialPageRoute(builder: (_) {
          return Scaffold(
            body: Center(
              child: Text('No route defined for ${settings.name}'),
            ),
          );
        });
    }
  }
}