const ControlAction = {
  CONNECT: 'control__connect',
  DISCONNECT: 'control__disconnect',
  SET_MACHINE_ID: 'control__set-machine-id',
  MOVE_COMMAND_START: 'control__move-command-start',
  MOVE_COMMAND_STOP: 'control__move-command-stop',
  TOOL_COMMAND_START: 'control__tool-command-start',
  TOOL_COMMAND_STOP: 'control__tool-command-stop', 
  MOVE_LINEAR: 'control__move-linear',
  STOP_LINEAR: 'control__stop-linear',
  MOVE_ANGULAR: 'control__move-angular',
  STOP_ANGULAR: 'control__stop-angular',
  SELECT_CLICK: 'control__select-click',
  START_CLICK: 'control__start-click',
};

export default ControlAction;
