import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:email_validator/email_validator.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:notification_demo/core/navigation/router_info.dart';
import 'package:notification_demo/features/login/presentation/cubit/login_cubit.dart';
import 'package:notification_demo/features/login/presentation/cubit/login_state.dart';

class Login extends StatelessWidget {
  Login({Key? key}) : super(key: key);
  final formGlobalKey = GlobalKey<FormState>();

  void showToast(String msg) {
    Fluttertoast.showToast(
      msg: msg,
      toastLength: Toast.LENGTH_LONG,
      gravity: ToastGravity.BOTTOM,
    );
  }
  bool isPasswordValid(String password) => password.length >= 6;

  bool isEmailValid(email) {
    if (EmailValidator.validate(email)) {
      return true;
    } else {
      return false;
    }
  }

  @override
  Widget build(BuildContext context) {
    print('login');
    TextEditingController emailController = TextEditingController();
    TextEditingController passwordController = TextEditingController();
    return BlocListener<LoginCubit, LoginState>(
  listener: (context, state) {
    if( state is LoginSuccess){
      Navigator.pushNamedAndRemoveUntil(context, RoutesName.home, (route) => false);
    }
  },
  child: Scaffold(
        body: Container(
            padding: const EdgeInsets.only(
                top: 100.0, right: 20.0, left: 20.0, bottom: 20.0),
            child: Form(
              autovalidateMode: AutovalidateMode.onUserInteraction,
              key: formGlobalKey,
              child: ListView(
                children: <Widget>[
                  Text(
                    "LOGIN",
                    style: TextStyle(
                        fontSize: 32.0,
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).primaryColor),
                  ),
                  const SizedBox(
                    height: 20.0,
                  ),
                  TextFormField(
                    controller: emailController,
                    validator: (email) {
                      if (!isEmailValid(email.toString()) || email == Null)
                        return 'Entera valid email address';
                      else
                        return null;
                    },
                    decoration: const InputDecoration(
                        icon: Icon(Icons.email),
                        labelText: 'Enter Email',
                        hintText: 'Enter Email'),
                  ),
                  const SizedBox(
                    height: 20.0,
                  ),
                  TextFormField(
                    controller: passwordController,
                    obscureText: true,
                    validator: (password) {
                      if (isPasswordValid(password.toString()))
                        return null;
                      else
                        return 'Enter a valid password';
                    },
                    decoration: const InputDecoration(
                        icon: Icon(Icons.remove_red_eye),
                        labelText: 'Enter Password',
                        hintText: 'Enter Password'),
                  ),
                  Container(
                    margin: const EdgeInsets.all(25),
                    child: ElevatedButton(
                        onPressed: () {
                          if (formGlobalKey.currentState!.validate()) {
                            formGlobalKey.currentState?.save();
                            context.read<LoginCubit>().LoginEmailPwd(emailController.text,passwordController.text);
                          }
                        },
                        child: const Text(
                          'LogIn',
                          style: TextStyle(fontSize: 20.0),
                        ),
                      ),
                  ),

                ],
              ),
            ))),
);
  }
}
