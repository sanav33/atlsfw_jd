//run the command in terminal: ifconfig en0 | grep "inet " | awk '{print $2}'
//replace the ip address on line 4 with the output of the above command

export const MY_IP_ADDRESS = '0.0.0.0';
export default MY_IP_ADDRESS;