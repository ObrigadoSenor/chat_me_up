import { StyleSheet } from 'react-native';
import { Button } from '../../components/atoms/button';

import { View } from '../../components/Themed';
import { useAppDispatch } from '../../store/store';
import { signOut } from '../../store/slices/auth';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={() => dispatch(signOut())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
