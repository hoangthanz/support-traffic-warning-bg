import 'package:flutter/material.dart';
import 'common/page_header.dart';
import 'package:open_street_map_search_and_pick/open_street_map_search_and_pick.dart';

class OSMPage extends StatefulWidget {
  const OSMPage({Key? key}) : super(key: key);

  @override
  State<OSMPage> createState() => _OSMPageState();
}

class _OSMPageState extends State<OSMPage> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xffEEF1F3),
        body: Column(
          children: [
            Expanded(
                child: OpenStreetMapSearchAndPick(
                    center: LatLong(16, 108),
                    buttonColor: Colors.blue,
                    buttonText: 'Set Current Location',
                    onPicked: (pickedData) {
                      print(pickedData.latLong.latitude);
                      print(pickedData.latLong.longitude);
                      print(pickedData.address);
                    })),
          ],
        ),
      ),
    );
  }
}
