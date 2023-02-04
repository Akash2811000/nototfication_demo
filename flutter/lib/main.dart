import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:notification_demo/features/login/presentation/pages/login.dart';
import './features/login/login_injection.dart' as loginsl ;
import 'firebase_options.dart'
import './core/navigation/app_router.dart' as app_routes;
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await loginsl.init();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Notofication',
        onGenerateRoute: app_routes.Router.generateRoutes,
    );
  }
}

