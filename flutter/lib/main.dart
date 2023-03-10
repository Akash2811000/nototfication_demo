import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:notification_demo/core/services/notification/notification_service.dart';

import './features/login/login_injection.dart' as loginsl ;

import './core/navigation/app_router.dart' as app_routes;
import 'firebase_options.dart';
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await loginsl.init();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  await PushNotificationService().setupInteractedMessage();
  PushNotificationService().broadcastNotification();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      navigatorKey: NavigationService.navigatorKey,
        debugShowCheckedModeBanner: false,
        title: 'Notofication',
        onGenerateRoute: app_routes.Router.generateRoutes,
    );
  }
}

