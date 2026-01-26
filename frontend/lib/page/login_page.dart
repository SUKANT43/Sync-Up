import 'dart:math';

import 'package:flutter/material.dart';


class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool hidePassword=true;
  bool remember=false;
  @override
  Widget build(BuildContext context) {
    final size=MediaQuery.of(context).size;
    final isMobile=size.width<900;
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: isMobile?20:60,
            vertical: 20
          ),
          child: Column(
            children: [

              //top bar
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.bubble_chart,color: Colors.blue,),
                      const SizedBox(width: 8,),
                        Text(
                        "Sync Up",
                        style: TextStyle(
                          fontSize: isMobile ? 18 : 22,
                          fontWeight: FontWeight.bold,
                        ),
                      )
                    ],
                  ),
                  Text(
                    "Lucid Imaging",
                    style: TextStyle(
                      fontSize: isMobile ? 14 : 16,
                      fontWeight: FontWeight.w500,
                    ),
                  )
                ],
              ),

              const SizedBox(height: 30,),

              //body content

              Expanded(
                child: isMobile
                  ?SingleChildScrollView(
                    child: Column(
                      children: [
                        _leftIllustration(isMobile),
                        const SizedBox(height: 30,),
                        _rightForn(isMobile)
                      ]

                    ),
              ):Row(
                children: [
                  Expanded(child: _leftIllustration(isMobile)),
                  const SizedBox(width: 40,),
                  Expanded(child: _rightForn(isMobile))
                ],
              ))

            ],
          ),
        ),
      ),
    );

  }



    Widget _leftIllustration(bool isMobile) {
    return Center(
      child: Container(
        height: isMobile ? 250 : 420,
        width: double.infinity,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: Colors.grey.shade100,
        ),
        child: Center(
          child: Image.asset("/Users/sukantc/Desktop/SyncUp/Sync-Up/frontend/assets/images/loginPage.png"),
          
        ),
      ),
    );
  }

Widget _rightForn(bool isMobile){
  return Align(
    alignment: Alignment.center,
    child: Container(
      width: isMobile?double.infinity:420,
      padding: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 18,
            spreadRadius: 3
          )
        ]
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Welcome back, Chief",
              style: TextStyle(
                fontSize: isMobile ? 24 : 28,
                fontWeight: FontWeight.bold,
              ),
          ),
          const SizedBox(height: 8,),
          Text(
              "Welcome back! Please enter your details.",
              style: TextStyle(
                fontSize: isMobile ? 14 : 16,
                color: Colors.grey.shade600,
              ),
          ),
          const SizedBox(height: 30,),


            //email
            TextField(
              decoration: InputDecoration(
                labelText: "Email",
                border: UnderlineInputBorder(),
              ),
            ),

            const SizedBox(height: 18,),

            //password
            TextField(
              obscureText: hidePassword,
              decoration: InputDecoration(
                labelText: "Password",
                border: const UnderlineInputBorder(),
                suffixIcon: IconButton(
                  onPressed: () {
                  setState(() {
                    hidePassword=!hidePassword;
                  });
                  } ,
                  icon: Icon(
                  hidePassword?Icons.visibility_off:Icons.visibility,
                  size: 20,
                ),)
              ),
            ),

          const SizedBox(height: 18,),

          Row(
              children: [
                const Text(""),
                const Spacer(),
                TextButton(
                  onPressed: () {},
                  child: const Text(
                    "Forgot Password",
                    style: TextStyle(decoration: TextDecoration.underline),
                  ),
                )
              ],
          ),

            const SizedBox(height: 18),

            // Button
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.black,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                onPressed: () {
                  // TODO: Login API call
                },
                child: const Text(
                  "Log in",
                  style: TextStyle(fontSize: 16, color: Colors.white),
                ),
              ),
            ),
        ],
      ),
    ),
  );
}
}


