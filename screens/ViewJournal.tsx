import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../components/context/AuthProvider';

const ViewJournal = ({ navigation }) => {
  const { user } = useContext(AuthContext) ?? {};
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<Date | null>(null);
  const [lastDayOfWeek, setLastDayOfWeek] = useState<Date | null>(null);

  useEffect(() => {
    const retrieveJournaledDreams = async () => {
      try {
        console.log("user: ", user);

        const today = new Date();
        const dayOfWeek = today.getDay(); // Sunday - 0, Monday - 1, etc.
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek + (weekOffset * 7));
        startOfWeek.setHours(0, 0, 0, 0);
        setFirstDayOfWeek(startOfWeek);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);
        setLastDayOfWeek(endOfWeek);

        const resJournalEntries = await axios.get('https://www.dreamoracles.co/api/dream/user/' + user?.email);
        
        const filteredDreams = resJournalEntries.data.filter(dream => {
          const dreamDate = new Date(dream.dreamDate);
          return dreamDate >= startOfWeek && dreamDate < endOfWeek;
        });

        const sortedDreams = filteredDreams.sort((a, b) => {
          return new Date(b.dreamDate).getTime() - new Date(a.dreamDate).getTime();
        });
      
        setDreams(sortedDreams);
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setLoading(false);
      }
    };

    retrieveJournaledDreams();
  }, [user, weekOffset]);

  const handleBackButton = () => {
    navigation.navigate("JournalDream");
  };

  const handleDreamPress = (dreamID) => {
    navigation.navigate("ViewDream", { dreamID });
  };

  const handleDeleteDream = async (dreamID) => {
    try {
      await axios.post(`https://www.dreamoracles.co/api/dream/delete/`, { dreamID });
      setDreams(dreams.filter(dream => dream._id !== dreamID));
    } catch (err) {
      console.log("Error deleting dream: ", err);
    }
  };

  const renderDreamItem = ({ item }) => (
    <View style={styles.dreamBox}>
      <Text style={styles.dreamDate}>{new Date(item.dreamDate).toLocaleDateString()}</Text>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => handleDreamPress(item._id)}>
        <Text style={styles.dreamText}>{item.dream.length > 100 ? item.dream.substring(0, 100) + '...' : item.dream}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.trashIcon} onPress={() => handleDeleteDream(item._id)}>
        <Image source={require('../assets/images/trash-bin.png')} style={[styles.trashImage, { tintColor: 'white' }]} />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Preparing Your Dream Journal</Text>
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, styles.delay200]} />
          <Animated.View style={[styles.dot, styles.delay400]} />
          <Animated.View style={styles.dot} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TouchableOpacity
          style={styles.buttonStyleViewJournal}
          onPress={handleBackButton}
        >
          <Text style={styles.buttonTextStyle}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{user?.name}'s Dream Journal</Text>
        <View style={styles.dateNavigationContainer}>
          <TouchableOpacity onPress={() => setWeekOffset(weekOffset - 1)}>
            <Image source={require('../assets/images/arrowLeft.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={styles.dates}>
            {firstDayOfWeek && lastDayOfWeek 
              ? `${firstDayOfWeek.toLocaleDateString()} - ${lastDayOfWeek.toLocaleDateString()}` 
              : 'Loading...'}
          </Text>
          <TouchableOpacity onPress={() => setWeekOffset(weekOffset + 1)}>
            <Image source={require('../assets/images/arrowRight.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={dreams}
        renderItem={renderDreamItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.dreamList}
      />
    </SafeAreaView>
  );
};

export default ViewJournal;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000020',
  },
  loadingText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    backgroundColor: '#6B7280',
    borderRadius: 8,
    marginHorizontal: 4,
    animation: 'pulse 1.5s infinite ease-in-out',
  },
  delay200: {
    animationDelay: '0.2s',
  },
  delay400: {
    animationDelay: '0.4s',
  },
  buttonStyleViewJournal: {
    backgroundColor: '#00FFFF',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 4,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonTextStyle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  dateNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  dates: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 10,
  },
  dreamList: {
    padding: 10,
  },
  dreamBox: {
    backgroundColor: '#00001A',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    position: 'relative',
    borderColor: '#292929',
    borderWidth: 2,
  },
  dreamDate: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: 'gray',
    fontSize: 14,
  },
  dreamText: {
    color: 'white',
    fontSize: 16,
    paddingTop: 8,
  },
  trashIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  trashImage: {
    width: 20,
    height: 20,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});
