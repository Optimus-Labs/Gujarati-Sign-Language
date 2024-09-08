import Button from '@/components/Button';
import { Divider } from '@/components/Divider';
import { HStack } from '@/components/HStack';
import { Text } from '@/components/Text';
import { VStack } from '@/components/VStack';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useAuth } from '@/context/AuthContext';
import { eventService } from '@/services/event';
import { Event } from '@/types/event';
import { UserRole } from '@/types/user';
import { useFocusEffect } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function EventsScreen() {
    const { user } = useAuth();
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);

    function onGoToEventPage(id: number) {
        if (user?.role === UserRole.Manager) {
            router.push(`/(events)/event/${id}`);
        }
    }

    async function buyTicket(id: number) {
        // try {
        //   await ticketService.createOne(id);
        //   Alert.alert("Success", "Ticket purchased successfully");
        //   fetchEvents();
        // } catch (error) {
        //   Alert.alert("Error", "Failed to buy ticket");
        // }
    }

    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const response = await eventService.getAll();
            setEvents(response.data);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch events");
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { fetchEvents(); }, []));

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Upcoming Events",
            headerRight: user?.role === UserRole.Manager ? headerRight : null,
        });
    }, [navigation, user]);

    return (
        <VStack flex={1} style={styles.container}>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={events}
                onRefresh={fetchEvents}
                refreshing={isLoading}
                ItemSeparatorComponent={() => <VStack h={20} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: event }) => (
                    <TouchableOpacity
                        onPress={() => onGoToEventPage(event.id)}
                        activeOpacity={1} // This prevents the default opacity change on press
                    >
                        <VStack style={styles.eventCard}>
                            <Image
                                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s' }}
                                style={styles.eventImage}
                            />
                            <VStack p={15} gap={10}>
                                <Text fontSize={22} bold>{event.name}</Text>
                                <HStack alignItems='center' gap={5}>
                                    <TabBarIcon name="location-outline" size={16} color="#666" />
                                    <Text fontSize={14} color="#666">{event.location}</Text>
                                </HStack>
                                <HStack alignItems='center' gap={5}>
                                    <TabBarIcon name="calendar-outline" size={16} color="#666" />
                                    <Text fontSize={14} color="#666">{event.date}</Text>
                                </HStack>
                                <Divider />
                                <HStack justifyContent='space-between'>
                                    <Text bold fontSize={14} color='#007AFF'>Sold: {event.totalTicketsPurchased}</Text>
                                    <Text bold fontSize={14} color='#34C759'>Entered: {event.totalTicketsEntered}</Text>
                                </HStack>
                                {user?.role === UserRole.Attendee && (
                                    <Button
                                        variant='contained'
                                        disabled={isLoading}
                                        onPress={() => buyTicket(event.id)}
                                        style={styles.buyButton}
                                    >
                                        Buy Ticket
                                    </Button>
                                )}
                            </VStack>
                            {user?.role === UserRole.Manager && (
                                <TabBarIcon
                                    size={24}
                                    name="chevron-forward"
                                    style={styles.chevronIcon}
                                />
                            )}
                        </VStack>
                    </TouchableOpacity>
                )}
            />
        </VStack>
    );
}

const headerRight = () => {
    return (
        <TabBarIcon
            size={32}
            name="add-circle-outline"
            onPress={() => router.push('/(events)/new')}
            color="#007AFF"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F7',
        padding: 2,
    },
    eventCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    eventImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    buyButton: {
        marginTop: 10,
        backgroundColor: '#007AFF',
    },
    chevronIcon: {
        position: 'absolute',
        right: 15,
        top: 15,
        color: '#007AFF',
    },
    listContent: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
});


