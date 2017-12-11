import json
import numpy as np


def main():
    data = json.load(open('data.json'))
    users = data["users"]

    total_games_played = 0
    endurance_counter = 0
    classic_counter = 0
    younglings = []
    elderlings = []
    all_players = []
    endurance_game_times = []
    classic_game_times = []
    for user_str in users:

        all_players.append(user_str)

        total_games_played += users[user_str]["nb_games_played"]

        if users[user_str]["info"]["age"] < 18 :
            younglings.append(user_str)
        else:
            elderlings.append(user_str)
        for game_tag in users[user_str]["games"]:

            # GET GAME TIME PER MODE
            game_type = users[user_str]["games"][game_tag]["type"]
            if game_type == "Endurance":
                endurance_counter += 1
                start_time = get_sec(users[user_str]["games"][game_tag]["start_time"][:8])
                end_time = users[user_str]["games"][game_tag]["end_time"]
                if end_time != 0:
                    end_time = get_sec(end_time[:8])
                    total_time = end_time - start_time
                    endurance_game_times.append(total_time)
            else:
                classic_counter += 1
                start_time = get_sec(users[user_str]["games"][game_tag]["start_time"][:8])
                end_time = users[user_str]["games"][game_tag]["end_time"]
                if end_time != 0:
                    end_time = get_sec(end_time[:8])
                    total_time = end_time - start_time
                    classic_game_times.append(total_time)

    print(classic_counter)
    print(classic_game_times)

def get_sec(time_str):
    h, m, s = time_str.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

if __name__ == "__main__":
    main()
