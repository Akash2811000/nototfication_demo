import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:notification_demo/features/login/domain/use_cases/login_usecase.dart';
import 'package:notification_demo/features/login/presentation/cubit/login_state.dart';

class LoginCubit extends Cubit<LoginState> {
  LoginCubit(this.loginUsecase) : super(LoginInitial());
LoginUsecase loginUsecase;
  LoginEmailPwd(String email,String password) async {
      emit(LoginLoading());
      print(' cubit ${email}');
      FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance; // Change here
      var token=await _firebaseMessaging.getToken();
     String? deviceId = await _getId();

    var res=await loginUsecase.call(Params(email, password, token!, deviceId!));
    res.fold((r)=>{print('r')},(l)=>{print('l')});

  }

  Future<String?> _getId() async {
    var deviceInfo = DeviceInfoPlugin();
    if (Platform.isIOS) { // import 'dart:io'
      var iosDeviceInfo = await deviceInfo.iosInfo;
      return iosDeviceInfo.identifierForVendor; // Unique ID on iOS
    } else {
      var androidDeviceInfo = await deviceInfo.androidInfo;
      return androidDeviceInfo.id; // Unique ID on Android
    }
  }
}
